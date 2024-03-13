import React from 'react';

export default function Loading() {
  return (
    <form id="contact-form">
      <p>
        <span>Name</span>
        <input disabled aria-label="First name" name="first" type="text" placeholder="First" />
        <input disabled aria-label="Last name" name="last" placeholder="Last" type="text" />
      </p>
      <label>
        <span>Twitter</span>
        <input disabled name="twitter" placeholder="@jack" type="text" />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          disabled
          aria-label="Avatar URL"
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea disabled name="notes" rows={6} />
      </label>
      <p>
        <button disabled type="submit">
          Save
        </button>
        <button disabled>Cancel</button>
      </p>
    </form>
  );
}
