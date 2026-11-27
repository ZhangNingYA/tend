import { createPortal } from 'react-dom';
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
    element.setAttribute('aria-label', count ? `${label}，${count} 条留言` : label);
  });
}

function findSentenceElements(articleSlug) {
  return [...document.querySelectorAll('[data-comment-anchor]')]
    .filter((element) => element.dataset.commentArticle === articleSlug);
}

function CommentEntry({ comment, canEdit, editing, editingBody, busy, onEdit, onSave, onCancel, onDelete }) {
  if (editing) {
    return (
      <span className="comment-entry comment-entry-editing">
        <form onSubmit={onSave}>
          <textarea value={editingBody} onChange={(event) => onEdit(event.target.value)} maxLength={2000} autoFocus aria-label="修改留言" />
          <span className="comment-form-actions"><button type="submit" disabled={busy}>保存</button><button type="button" onClick={onCancel}>取消</button></span>
        </form>
      </span>
    );
  }

  return (
    <span className="comment-entry">
      <span className="comment-entry-meta"><strong>{comment.authorName}</strong><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' })}</time></span>
      <span className="comment-entry-body">{comment.body}</span>
      {canEdit && <span className="comment-entry-actions"><button type="button" onClick={onEdit}>修改</button><button type="button" onClick={onDelete}>删除</button></span>}
    </span>
  );
}

function InlineThread({ anchorKey, comments, selected, me, loginOpen, password, draft, editingId, editingBody, busy, error, onActivate, onLoginOpen, onPassword, onLogin, onLogout, onDraft, onSubmit, onEditStart, onEditBody, onEditSave, onEditCancel, onDelete }) {
  const active = selected?.anchorKey === anchorKey;
  return (
    <div className={`comment-thread ${active ? 'is-active' : ''}`} data-comment-thread={anchorKey} role="region" aria-label="句子留言">
      <div className="comment-thread-head">
        <span className="comment-thread-label">{comments.length ? `${comments.length} 条留言` : '还没有留言'}</span>
        {!active && <button className="comment-thread-open" type="button" onClick={onActivate}>写留言</button>}
      </div>

      {comments.length > 0 && (
        <div className="comment-thread-list">
          {comments.map((comment) => (
            <CommentEntry
              key={comment.id}
              comment={comment}
              canEdit={me?.id === comment.authorId}
              editing={editingId === comment.id}
              editingBody={editingBody}
              busy={busy}
              onEdit={(value) => editingId === comment.id ? onEditBody(value) : onEditStart(comment)}
              onSave={(event) => onEditSave(event, comment.id, anchorKey)}
              onCancel={onEditCancel}
              onDelete={() => onDelete(comment.id, anchorKey)}
            />
          ))}
        </div>
      )}

      {active && (
        <div className="comment-thread-composer">
          {me ? (
            <form onSubmit={(event) => onSubmit(event, anchorKey)}>
              <div className="comment-composer-user"><span>以 {me.name} 的身份留言</span><button type="button" onClick={onLogout} disabled={busy}>退出</button></div>
              <textarea value={draft} onChange={(event) => onDraft(event.target.value)} maxLength={2000} placeholder="写一句想留在这里的话" aria-label="留言内容" />
              <div className="comment-composer-footer"><span>{draft.length}/2000</span><button type="submit" disabled={busy || !draft.trim()}>发布留言</button></div>
            </form>
          ) : loginOpen ? (
            <form onSubmit={onLogin}>
              <label className="comment-login-label">输入密码后发表评论</label>
              <input type="password" value={password} onChange={(event) => onPassword(event.target.value)} autoComplete="current-password" required aria-label="评论密码" />
              <div className="comment-form-actions"><button type="submit" disabled={busy}>进入</button><button type="button" onClick={() => onLoginOpen(false)}>取消</button></div>
            </form>
          ) : (
            <button className="comment-login-trigger" type="button" onClick={() => onLoginOpen(true)}>输入密码，留下留言</button>
          )}
          {error && <p className="comment-error">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default function CommentLayer({ articleSlug }) {
  const [commentsByAnchor, setCommentsByAnchor] = useState({});
  const [selected, setSelected] = useState(null);
  const [hosts, setHosts] = useState([]);
  const [me, setMe] = useState(null);
  const [password, setPassword] = useState('');
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [serviceState, setServiceState] = useState('loading');
  const [loginOpen, setLoginOpen] = useState(false);

  const groupedComments = useMemo(() => Object.fromEntries(
    Object.entries(commentsByAnchor).map(([key, comments]) => [
      key,
      comments.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    ]),
  ), [commentsByAnchor]);

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
    if (serviceState !== 'ready') return undefined;
    const wanted = new Set(Object.keys(groupedComments));
    if (selected?.anchorKey) wanted.add(selected.anchorKey);
    const entries = [];
    findSentenceElements(articleSlug).forEach((sentence) => {
      const anchorKey = sentence.dataset.commentAnchor;
      if (!wanted.has(anchorKey)) return;
      let host = sentence.nextElementSibling;
      if (!host?.matches?.('[data-comment-thread-host]')) {
        host = document.createElement('span');
        host.className = 'comment-thread-host';
        host.dataset.commentThreadHost = anchorKey;
        sentence.after(host);
      }
      entries.push({ anchorKey, host });
    });
    setHosts(entries);
    return undefined;
  }, [articleSlug, groupedComments, selected, serviceState]);

  useEffect(() => {
    const activate = (event) => {
      const target = event.target.closest?.('[data-comment-anchor]');
      if (!target || target.dataset.commentArticle !== articleSlug) return;
      event.preventDefault();
      setSelected({ anchorKey: target.dataset.commentAnchor, text: target.textContent?.trim() || '' });
      setError('');
      window.setTimeout(() => {
        const host = [...document.querySelectorAll('[data-comment-thread-host]')]
          .find((element) => element.dataset.commentThreadHost === target.dataset.commentAnchor);
        host?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 0);
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

  const activateAnchor = (anchorKey) => {
    const sentence = findSentenceElements(articleSlug).find((element) => element.dataset.commentAnchor === anchorKey);
    setSelected({ anchorKey, text: sentence?.textContent?.trim() || '' });
    setError('');
  };

  const login = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = await request('/auth/login', { method: 'POST', body: JSON.stringify({ password }) });
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

  const submitComment = async (event, anchorKey) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setBusy(true);
    setError('');
    try {
      const payload = await request('/comments', {
        method: 'POST',
        body: JSON.stringify({ articleSlug, anchorKey, anchorTextSnapshot: selected?.text || '', body: draft.trim() }),
      });
      setCommentsByAnchor((current) => ({ ...current, [anchorKey]: [...(current[anchorKey] || []), payload.comment] }));
      setDraft('');
    } catch (requestError) {
      if (requestError.status === 401) setLoginOpen(true);
      setError(requestError.message || '留言发布失败');
    } finally {
      setBusy(false);
    }
  };

  const updateComment = async (event, commentId, anchorKey) => {
    event.preventDefault();
    if (!editingBody.trim()) return;
    setBusy(true);
    setError('');
    try {
      const payload = await request(`/comments/${commentId}`, { method: 'PATCH', body: JSON.stringify({ body: editingBody.trim() }) });
      setCommentsByAnchor((current) => ({ ...current, [anchorKey]: current[anchorKey].map((comment) => comment.id === commentId ? payload.comment : comment) }));
      setEditing(null);
      setEditingBody('');
    } catch (requestError) {
      setError(requestError.message || '留言修改失败');
    } finally {
      setBusy(false);
    }
  };

  const deleteComment = async (commentId, anchorKey) => {
    if (!window.confirm('确定删除这条留言吗？')) return;
    setBusy(true);
    setError('');
    try {
      await request(`/comments/${commentId}`, { method: 'DELETE' });
      setCommentsByAnchor((current) => ({ ...current, [anchorKey]: current[anchorKey].filter((comment) => comment.id !== commentId) }));
    } catch (requestError) {
      setError(requestError.message || '留言删除失败');
    } finally {
      setBusy(false);
    }
  };

  if (serviceState !== 'ready') return null;

  return (
    <div className="comment-layer-inline" aria-live="polite">
      {hosts.map(({ anchorKey, host }) => createPortal(
        <InlineThread
          key={anchorKey}
          anchorKey={anchorKey}
          comments={groupedComments[anchorKey] || []}
          selected={selected}
          me={me}
          loginOpen={loginOpen && selected?.anchorKey === anchorKey}
          password={password}
          draft={draft}
          editingId={editing?.anchorKey === anchorKey ? editing.id : null}
          editingBody={editingBody}
          busy={busy}
          error={selected?.anchorKey === anchorKey ? error : ''}
          onActivate={() => activateAnchor(anchorKey)}
          onLoginOpen={setLoginOpen}
          onPassword={setPassword}
          onLogin={login}
          onLogout={logout}
          onDraft={setDraft}
          onSubmit={submitComment}
          onEditStart={(comment) => { setEditing({ anchorKey, id: comment.id }); setEditingBody(comment.body); }}
          onEditBody={setEditingBody}
          onEditSave={updateComment}
          onEditCancel={() => { setEditing(null); setEditingBody(''); }}
          onDelete={deleteComment}
        />,
        host,
      ))}
    </div>
  );
}
