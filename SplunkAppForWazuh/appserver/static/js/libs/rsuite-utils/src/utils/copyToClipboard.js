function execCommandCopy() {
  let succeeded;
  try {
    succeeded = document.execCommand('copy');
  } catch (err) {
    succeeded = false;
  }
  return succeeded;
}

function select(input) {
  let selectedText;
  let isReadOnly = input.hasAttribute('readonly');
  if (!isReadOnly) {
    input.setAttribute('readonly', '');
  }
  input.select();
  input.setSelectionRange(0, input.value.length);
  if (!isReadOnly) {
    input.removeAttribute('readonly');
  }
  selectedText = input.value;
  return selectedText;
}

function copy(text) {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  const fakeElem = document.createElement('textarea');
  const yPosition = window.pageYOffset || document.documentElement.scrollTop;
  const fakeElemStyle = {
    // Prevent zooming on iOS
    fontSize: '12pt',
    // Reset box model
    border: '0',
    padding: '0',
    margin: '0',
    // Move element out of screen horizontally
    position: 'absolute',
    [isRTL ? 'right' : 'left']: '-9999px',
    top: `${yPosition}px`
  };
  Object.keys(fakeElemStyle).forEach(key => {
    fakeElem.style[key] = fakeElemStyle[key];
  });

  fakeElem.setAttribute('readonly', '');
  fakeElem.value = text;
  document.body.appendChild(fakeElem);
  select(fakeElem);
  const result = execCommandCopy();
  document.body.removeChild(fakeElem);
  return result;
}

export default copy;
