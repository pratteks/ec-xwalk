const FORM_FIELDS = [
  {
    name: 'firstName', label: 'First name', type: 'text', required: true,
  },
  {
    name: 'lastName', label: 'Last name', type: 'text', required: true,
  },
  {
    name: 'email', label: 'Email address', type: 'email', required: true,
  },
  {
    name: 'phone', label: 'Phone', type: 'tel', required: true,
  },
  {
    name: 'companyName', label: 'Company name', type: 'text', required: true,
  },
];

const COMMENT_PLACEHOLDER = 'Do not include any personal information such as a Social Security number (SSN), Employer Identification Number (EIN), driver\'s license or state ID number, financial account number(s), credit or debit card number(s), or any other sensitive information in this form.';

function createField({
  name, label, type, required,
}) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('rai-field');

  const labelEl = document.createElement('label');
  labelEl.setAttribute('for', `rai-${name}`);
  labelEl.textContent = label;
  if (required) labelEl.dataset.required = 'true';

  const input = document.createElement('input');
  input.type = type;
  input.id = `rai-${name}`;
  input.name = name;
  input.required = required;
  input.setAttribute('aria-label', label);

  wrapper.append(labelEl, input);
  return wrapper;
}

function createTextarea() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('rai-field', 'rai-field-full');

  const label = document.createElement('label');
  label.setAttribute('for', 'rai-comment');
  label.textContent = 'Add comment';

  const textarea = document.createElement('textarea');
  textarea.id = 'rai-comment';
  textarea.name = 'comment';
  textarea.rows = 4;
  textarea.placeholder = COMMENT_PLACEHOLDER;
  textarea.setAttribute('aria-label', 'Add comment');

  wrapper.append(label, textarea);
  return wrapper;
}

function createCheckbox() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('rai-checkbox');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = 'rai-optin';
  input.name = 'optIn';

  const label = document.createElement('label');
  label.setAttribute('for', 'rai-optin');
  label.textContent = 'Yes, please send me the latest news and offers for AT&T Business solutions.';

  wrapper.append(input, label);
  return wrapper;
}

function createSubmitButton() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('rai-submit');

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Submit';

  wrapper.append(button);
  return wrapper;
}

function createPrivacyLink() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('rai-privacy');

  const text = document.createTextNode('We are committed to protecting your ');
  const link = document.createElement('a');
  link.href = 'https://www.att.com/gen/privacy-policy?pid=2506';
  link.textContent = 'privacy';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  wrapper.append(text, link, document.createTextNode('.'));
  return wrapper;
}

function createErrorBanner() {
  const banner = document.createElement('div');
  banner.classList.add('rai-error-banner');
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'polite');
  banner.hidden = true;
  banner.textContent = 'Please fix the below request info form errors';
  return banner;
}

function showFieldError(field) {
  const existing = field.parentElement.querySelector('.rai-field-error');
  if (existing) existing.remove();

  const error = document.createElement('span');
  error.classList.add('rai-field-error');
  error.setAttribute('role', 'alert');
  error.textContent = `${field.getAttribute('aria-label') || 'This field'} is required`;
  field.parentElement.append(error);
  field.classList.add('rai-invalid');
}

function clearFieldError(field) {
  const existing = field.parentElement.querySelector('.rai-field-error');
  if (existing) existing.remove();
  field.classList.remove('rai-invalid');
}

export default function decorate(block) {
  const form = document.createElement('form');
  form.classList.add('rai-form-inner');
  form.noValidate = true;

  const errorBanner = createErrorBanner();
  form.append(errorBanner);

  const fieldsGrid = document.createElement('div');
  fieldsGrid.classList.add('rai-fields-grid');

  FORM_FIELDS.forEach((fd) => {
    fieldsGrid.append(createField(fd));
  });

  fieldsGrid.append(createTextarea());
  form.append(fieldsGrid);
  form.append(createCheckbox());
  form.append(createSubmitButton());
  form.append(createPrivacyLink());

  // validation on blur
  form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
    field.addEventListener('blur', () => {
      if (!field.value.trim()) {
        showFieldError(field);
      } else {
        clearFieldError(field);
      }
    });

    field.addEventListener('input', () => {
      if (field.value.trim()) {
        clearFieldError(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const requiredFields = form.querySelectorAll('input[required]');
    let hasErrors = false;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        showFieldError(field);
        hasErrors = true;
      } else {
        clearFieldError(field);
      }
    });

    if (hasErrors) {
      errorBanner.hidden = false;
      const firstInvalid = form.querySelector('.rai-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    errorBanner.hidden = true;

    const payload = {};
    [...form.elements].forEach((field) => {
      if (field.name) {
        if (field.type === 'checkbox') {
          payload[field.name] = field.checked;
        } else {
          payload[field.name] = field.value;
        }
      }
    });

    // eslint-disable-next-line no-console
    console.log('Form submitted:', payload);
  });

  block.textContent = '';
  block.append(form);
}
