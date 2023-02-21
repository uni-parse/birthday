export const dialog = document.createElement('dialog')
//mechid
dialog.innerHTML = `
  <form method=dialog>
    <h3>😎Hi uniParse✨</h3>
    <p>I create for u a Gift🎁</p>
    <details>
      <summary>
        but first, answer the questions:
      </summary><br>
      <label>which <em>year</em> our first meeting?
        <select required>
          <option selected disabled hidden></option>
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
        </select>
      </label><br>
      <label>which day I <em>born</em>?
        <input type=date value='2000-01-29' required>
      </label><br>
      <button type=button disabled data-lock='🔒'>Locked</button>
    </details>
  </form>`