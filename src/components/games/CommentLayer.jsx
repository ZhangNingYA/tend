import { useEffect, useMemo, useState } from 'react';
import '../../styles/comments.css';

const API_BASE = (import.meta.env.PUBLIC_COMMENT_API_URL || '/api').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.error || '评论服务请求失败');
    error.status = response.status;
    throw error;
  }
  return payload;
}

function updateAnchorDecorations(articleSlug, commentsByAnchor, selectedKey) {
  document.querySelectorAll('[data-comment-anchor]').forEach((element) => {
    if (element.dataset.commentArticle !== articleSlug) return;
    const key = element.dataset.commentAnchor;
    const count = commentsByAnchor[key]?.length || 0;
    if (count) element.dataset.commentCount = String(count);
    else delete element.dataset.commentCount;
    element.classList.toggle('is-comment-selected', key === selectedKey);
    const label = element.textContent?.trim() || '';
    element.setAttribute('aria-label', count ? `${label}，${count} 条评论` : label);
  });
}

export default function CommentLayer({ articleSlug }) {
  const [commentsByAnchor, setCommentsByAnchor] = useState({});
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [password, setPassword] = useState('');
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [serviceState, setServiceState] = useState('loading');
  const [loginOpen, setLoginOpen] = useState(false);

  const selectedComments = selected ? commentsByAnchor[selected.anchorKey] || [] : [];
  const currentCount = selectedComments.length;

  const groupedComments = useMemo(() => {
    const grouped = {};
    Object.entries(commentsByAnchor).forEach(([key, comments]) => {
      grouped[key] = comments.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });
    return grouped;
  }, [commentsByAnchor]);

  useEffect(() => {
    let active = true;
    Promise.all([
      request(`/comments?article=${encodeURIComponent(articleSlug)}`),
      request('/auth/me'),
    ])
      .then(([commentPayload, authPayload]) => {
        if (!active) return;
        const grouped = {};
        (commentPayload.comments || []).forEach((comment) => {
          if (!grouped[comment.anchorKey]) grouped[comment.anchorKey] = [];
          grouped[comment.anchorKey].push(comment);
        });
        setCommentsByAnchor(grouped);
        setMe(authPayload.user || null);
        setServiceState('ready');
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError.message || '评论服务暂时不可用');
        setServiceState('offline');
      });
    return () => { active = false; };
  }, [articleSlug]);

  useEffect(() => {
    updateAnchorDecorations(articleSlug, groupedComments, selected?.anchorKey);
  }, [articleSlug, groupedComments, selected]);

  useEffect(() => {
    const activate = (event) => {
      const target = event.target.closest?.('[data-comment-anchor]');
      if (!target || target.dataset.commentArticle !== articleSlug) return;
      event.preventDefault();
      setSelected({
        anchorKey: target.dataset.commentAnchor,
        text: target.textContent?.trim() || '',
      });
      setOpen(true);
      setError('');
    };
    const onKeyDown = (event) => {
      if ((event.key !== 'Enter' && event.key !== ' ') || !event.target.matches?.('[data-comment-anchor]')) return;
      activate(event);
    };
    document.addEventListener('click', activate);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', activate);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [articleSlug]);

  const login = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      setMe(payload.user);
      setPassword('');
      setLoginOpen(false);
    } catch (requestError) {
      setError(requestError.message || '密码错误');
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    try {
      await request('/auth/logout', { method: 'POST' });
      setMe(null);
    } catch (requestError) {
      setError(requestError.message || '退出登录失败');
    } finally {
      setBusy(false);
    }
  };

  const submitComment = async (event) => {
    event.preventDefault();
    if (!selected || !draft.trim()) return;
    setBusy(true);
    setError('');
    try {
      const payload = await request('/comments', {
        method: 'POST',
        body: JSON.stringify({
          articleSlug,
          anchorKey: selected.anchorKey,
          anchorTextSnapshot: selected.text,
          body: draft.trim(),
        }),
      });
      setCommentsByAnchor((current) => ({
        ...current,
        [selected.anchorKey]: [...(current[selected.anchorKey] || []), payload.comment],
      }));
      setDraft('');
    } catch (requestError) {
      if (requestError.status === 401) setLoginOpen(true);
      setError(requestError.message || '评论发布失败');
    } finally {
      setBusy(false);
    }
  };

  const updateComment = async (event, commentId) => {
    event.preventDefault();
    if (!editingBody.trim()) return;
    setBusy(true);
    setError('');
    try {
      const payload = await request(`/comments/${commentId}`, {
        method: 'PATCH',
        body: JSON.stringify({ body: editingBody.trim() }),
      });
      setCommentsByAnchor((current) => ({
        ...current,
        [selected.anchorKey]: current[selected.anchorKey].map((comment) => comment.id === commentId ? payload.comment : comment),
      }));
      setEditingId(null);
      setEditingBody('');
    } catch (requestError) {
      setError(requestError.message || '评论修改失败');
    } finally {
      setBusy(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm('确定删除这条评论吗？')) return;
    setBusy(true);
    setError('');
    try {
      await request(`/comments/${commentId}`, { method: 'DELETE' });
      setCommentsByAnchor((current) => ({
        ...current,
        [selected.anchorKey]: current[selected.anchorKey].filter((comment) => comment.id !== commentId),
      }));
    } catch (requestError) {
      setError(requestError.message || '评论删除失败');
    } finally {
      setBusy(false);
    }
  };

  if (serviceState === 'loading') return null;

  return (
    <div className={`comment-layer ${open ? 'is-open' : ''}`} aria-live="polite">
      <button className="comment-layer-backdrop" type="button" aria-label="关闭评论" onClick={() => setOpen(false)} />
      <aside className="comment-panel" aria-label="句子评论" aria-hidden={!open}>
        <header className="comment-panel-header">
          <div>
            <span className="comment-panel-kicker">SENTENCE NOTES</span>
            <strong>句子评论</strong>
          </div>
          <button className="comment-close" type="button" aria-label="关闭评论" onClick={() => setOpen(false)}>×</button>
        </header>

        {serviceState === 'offline' ? (
          <p className="comment-status">{error || '评论服务暂时不可用。'}</p>
        ) : !selected ? (
          <p className="comment-status">点击正文中的一句话，打开它的评论。</p>
        ) : (
          <div className="comment-panel-content">
            <blockquote className="comment-anchor-quote">“{selected.text}”</blockquote>
            <p className="comment-count-label">{currentCount ? `${currentCount} 条评论` : '还没有评论'}</p>

            <div className="comment-list">
              {selectedComments.map((comment) => (
                <article className="comment-item" key={comment.id}>
                  {editingId === comment.id ? (
                    <form onSubmit={(event) => updateComment(event, comment.id)}>
                      <textarea value={editingBody} onChange={(event) => setEditingBody(event.target.value)} maxLength={2000} autoFocus />
                      <div className="comment-form-actions"><button type="submit" disabled={busy}>保存</button><button type="button" onClick={() => setEditingId(null)}>取消</button></div>
                    </form>
                  ) : (
                    <>
                      <div className="comment-item-meta"><strong>{comment.authorName}</strong><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' })}</time></div>
                      <p>{comment.body}</p>
                      {me?.id === comment.authorId && <div className="comment-item-actions"><button type="button" onClick={() => { setEditingId(comment.id); setEditingBody(comment.body); }}>修改</button><button type="button" onClick={() => deleteComment(comment.id)}>删除</button></div>}
                    </>
                  )}
                </article>
              ))}
            </div>

            {me ? (
              <form className="comment-composer" onSubmit={submitComment}>
                <div className="comment-composer-user"><span>以 {me.name} 的身份</span><button type="button" onClick={logout} disabled={busy}>退出</button></div>
                <textarea value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={2000} placeholder="写一句想留在这里的话" aria-label="评论内容" />
                <div className="comment-composer-footer"><span>{draft.length}/2000</span><button type="submit" disabled={busy || !draft.trim()}>发布评论</button></div>
              </form>
            ) : loginOpen ? (
              <form className="comment-login" onSubmit={login}>
                <label htmlFor="comment-password">输入密码后发表评论</label>
                <input id="comment-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
                <div className="comment-form-actions"><button type="submit" disabled={busy}>进入</button><button type="button" onClick={() => setLoginOpen(false)}>取消</button></div>
              </form>
            ) : (
              <button className="comment-login-trigger" type="button" onClick={() => setLoginOpen(true)}>输入密码，留下评论</button>
            )}
            {error && <p className="comment-error">{error}</p>}
          </div>
        )}
      </aside>
    </div>
  );
}
