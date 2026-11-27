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
    element.setAttribute('aria-label', count ? `${label}，${count} 条留言` : `${label}，点击查看留言`);
  });
}

function findSentenceElements(articleSlug) {
  if (typeof document === 'undefined') return [];
  return [...document.querySelectorAll('[data-comment-anchor]')]
    .filter((element) => element.dataset.commentArticle === articleSlug);
}

function formatDate(value) {
  return new Date(value).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' });
}

function CommentEntry({ comment, canEdit, editing, editingBody, busy, onEdit, onEditBody, onSave, onCancel, onDelete }) {
  if (editing) {
    return (
      <li className="comment-entry comment-entry-editing">
        <form onSubmit={onSave}>
          <textarea value={editingBody} onChange={(event) => onEditBody(event.target.value)} maxLength={2000} autoFocus aria-label="修改留言" />
          <div className="comment-form-actions">
            <button className="comment-button comment-button-primary" type="submit" disabled={busy}>保存</button>
            <button className="comment-button" type="button" onClick={onCancel}>取消</button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="comment-entry">
      <div className="comment-entry-meta">
        <strong>{comment.authorName}</strong>
        <time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time>
      </div>
      <p className="comment-entry-body">{comment.body}</p>
      {canEdit && (
        <div className="comment-entry-actions">
          <button className="comment-button" type="button" onClick={onEdit}>修改</button>
          <button className="comment-button comment-button-danger" type="button" onClick={onDelete}>删除</button>
        </div>
      )}
    </li>
  );
}

function LoginForm({ password, busy, onPassword, onLogin }) {
  return (
    <form className="comment-login-form" onSubmit={onLogin}>
      <label htmlFor="comment-password">留言密码</label>
      <div className="comment-login-row">
        <input id="comment-password" type="password" value={password} onChange={(event) => onPassword(event.target.value)} autoComplete="current-password" required />
        <button className="comment-button comment-button-primary" type="submit" disabled={busy}>进入</button>
      </div>
    </form>
  );
}

function Composer({ me, draft, busy, onDraft, onSubmit, onLogout }) {
  return (
    <form className="comment-composer" onSubmit={onSubmit}>
      <div className="comment-composer-user">
        <span><i aria-hidden="true"></i>以 {me.name} 的身份留言</span>
        <button className="comment-button" type="button" onClick={onLogout} disabled={busy}>退出</button>
      </div>
      <textarea value={draft} onChange={(event) => onDraft(event.target.value)} maxLength={2000} placeholder="写下想留在这里的话" aria-label="留言内容" />
      <div className="comment-composer-footer">
        <span>{draft.length}/2000</span>
        <button className="comment-button comment-button-primary" type="submit" disabled={busy || !draft.trim()}>发布留言</button>
      </div>
    </form>
  );
}

function BoardOverview({ entries, selectedKey, onSelect }) {
  return (
    <div className="comment-board-overview">
      <div className="comment-board-overview-head">
        <span>全部留言</span>
        <span>{entries.reduce((total, entry) => total + entry.comments.length, 0)} 条</span>
      </div>
      {entries.length ? (
        <ul className="comment-anchor-list">
          {entries.map(({ anchorKey, text, comments }) => {
            const latest = comments[comments.length - 1];
            return (
              <li key={anchorKey}>
                <button className={`comment-anchor-item ${selectedKey === anchorKey ? 'is-selected' : ''}`} type="button" onClick={() => onSelect(anchorKey)}>
                  <span className="comment-anchor-quote">“{text}”</span>
                  <span className="comment-anchor-meta"><span>{comments.length} 条留言</span><time dateTime={latest.createdAt}>{formatDate(latest.createdAt)}</time></span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="comment-empty"><span className="comment-empty-mark" aria-hidden="true">♡</span><strong>还没有留言</strong><span>从正文中选一句话开始。</span></div>
      )}
    </div>
  );
}

function ThreadView({ selected, comments, me, password, draft, editingId, editingBody, busy, error, onPassword, onLogin, onLogout, onDraft, onSubmit, onEditStart, onEditBody, onEditSave, onEditCancel, onDelete, onBack }) {
  return (
    <div className="comment-thread-view">
      <button className="comment-back-button" type="button" onClick={onBack}>← 全部留言</button>
      <blockquote className="comment-selected-quote">{selected.text}</blockquote>
      <div className="comment-thread-heading">
        <span>这句话的留言</span>
        <span>{comments.length} 条</span>
      </div>
      {comments.length > 0 && (
        <ul className="comment-thread-list">
          {comments.map((comment) => (
            <CommentEntry
              key={comment.id}
              comment={comment}
              canEdit={me?.id === comment.authorId}
              editing={editingId === comment.id}
              editingBody={editingBody}
              busy={busy}
              onEdit={() => onEditStart(comment)}
              onEditBody={onEditBody}
              onSave={(event) => onEditSave(event, comment.id, selected.anchorKey)}
              onCancel={onEditCancel}
              onDelete={() => onDelete(comment.id, selected.anchorKey)}
            />
          ))}
        </ul>
      )}
      <div className="comment-composer-wrap">
        {me ? (
          <Composer me={me} draft={draft} busy={busy} onDraft={onDraft} onSubmit={(event) => onSubmit(event, selected.anchorKey)} onLogout={onLogout} />
        ) : (
          <LoginForm password={password} busy={busy} onPassword={onPassword} onLogin={onLogin} />
        )}
        {error && <p className="comment-error" role="alert">{error}</p>}
      </div>
    </div>
  );
}

export default function CommentLayer({ articleSlug }) {
  const [commentsByAnchor, setCommentsByAnchor] = useState({});
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [password, setPassword] = useState('');
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [serviceState, setServiceState] = useState('loading');

  const groupedComments = useMemo(() => Object.fromEntries(
    Object.entries(commentsByAnchor).map(([key, comments]) => [
      key,
      comments.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    ]),
  ), [commentsByAnchor]);

  const boardEntries = useMemo(() => Object.entries(groupedComments)
    .map(([anchorKey, comments]) => {
      const sentence = findSentenceElements(articleSlug).find((element) => element.dataset.commentAnchor === anchorKey);
      return { anchorKey, comments, text: sentence?.textContent?.trim() || comments[0]?.anchorTextSnapshot || '原文句子' };
    })
    .sort((a, b) => new Date(b.comments[b.comments.length - 1].createdAt) - new Date(a.comments[a.comments.length - 1].createdAt)),
  [articleSlug, groupedComments]);

  const totalComments = boardEntries.reduce((total, entry) => total + entry.comments.length, 0);

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
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  useEffect(() => {
    const activate = (event) => {
      const target = event.target.closest?.('[data-comment-anchor]');
      if (!target || target.dataset.commentArticle !== articleSlug) return;
      event.preventDefault();
      setSelected({ anchorKey: target.dataset.commentAnchor, text: target.textContent?.trim() || '' });
      setIsOpen(true);
      setError('');
    };
    const onKeyDown = (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches?.('[data-comment-anchor]')) {
        activate(event);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSelected(null);
      }
    };
    document.addEventListener('click', activate);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', activate);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [articleSlug]);

  const closeBoard = () => {
    setIsOpen(false);
    setSelected(null);
    setEditing(null);
    setEditingBody('');
    setError('');
  };

  const selectAnchor = (anchorKey) => {
    const sentence = findSentenceElements(articleSlug).find((element) => element.dataset.commentAnchor === anchorKey);
    setSelected({ anchorKey, text: sentence?.textContent?.trim() || groupedComments[anchorKey]?.[0]?.anchorTextSnapshot || '原文句子' });
    setError('');
    sentence?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  const login = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = await request('/auth/login', { method: 'POST', body: JSON.stringify({ password }) });
      setMe(payload.user);
      setPassword('');
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
      if (requestError.status === 401) setMe(null);
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
      setCommentsByAnchor((current) => {
        const next = { ...current };
        const remaining = (next[anchorKey] || []).filter((comment) => comment.id !== commentId);
        if (remaining.length) next[anchorKey] = remaining;
        else delete next[anchorKey];
        return next;
      });
    } catch (requestError) {
      setError(requestError.message || '留言删除失败');
    } finally {
      setBusy(false);
    }
  };

  if (serviceState !== 'ready') return null;

  const board = (
    <>
      <button className="comment-board-trigger" type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="comment-board">
        <span className="comment-board-trigger-mark" aria-hidden="true">✳</span>
        <span>留言板</span>
        {totalComments > 0 && <b>{totalComments}</b>}
      </button>
      {isOpen && (
        <div className="comment-board-layer">
          <button className="comment-board-scrim" type="button" aria-label="关闭留言板" onClick={closeBoard}></button>
          <aside className="comment-board" id="comment-board" role="dialog" aria-modal="true" aria-label="留言板">
            <header className="comment-board-header">
              <div><p className="comment-board-kicker">OUR LITTLE NOTES</p><h2>留言板</h2><span>{totalComments ? `${totalComments} 条留言` : '留下一点想说的话'}</span></div>
              <button className="comment-board-close" type="button" onClick={closeBoard} aria-label="关闭留言板">×</button>
            </header>
            {selected ? (
              <ThreadView
                selected={selected}
                comments={groupedComments[selected.anchorKey] || []}
                me={me}
                password={password}
                draft={draft}
                editingId={editing?.anchorKey === selected.anchorKey ? editing.id : null}
                editingBody={editingBody}
                busy={busy}
                error={error}
                onPassword={setPassword}
                onLogin={login}
                onLogout={logout}
                onDraft={setDraft}
                onSubmit={submitComment}
                onEditStart={(comment) => { setEditing({ anchorKey: selected.anchorKey, id: comment.id }); setEditingBody(comment.body); }}
                onEditBody={setEditingBody}
                onEditSave={updateComment}
                onEditCancel={() => { setEditing(null); setEditingBody(''); }}
                onDelete={deleteComment}
                onBack={() => { setSelected(null); setError(''); }}
              />
            ) : (
              <BoardOverview entries={boardEntries} selectedKey={selected?.anchorKey} onSelect={selectAnchor} />
            )}
          </aside>
        </div>
      )}
    </>
  );

  return createPortal(board, document.body);
}
