document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const msgDiv = document.getElementById('response-msg');
  const btn = document.getElementById('submit-btn');

  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    msgDiv.classList.add('d-none');

    // Get the values, including the honeypot
    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      honeypot: document.getElementById('honeypot').value // Send this to the server
    };

    try {
      const response = await fetch('https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-8c8a1d7e-5bb6-4385-b9c4-f4d885782403/mailer/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      msgDiv.classList.remove('d-none', 'alert-danger', 'alert-success');

      if (response.ok) {
        msgDiv.classList.add('alert-success');
        msgDiv.innerText = "Success! Your message has been sent.";
        form.reset();
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (err) {
      msgDiv.classList.remove('d-none');
      msgDiv.classList.add('alert-danger');
      msgDiv.innerText = "Error: " + err.message;
    } finally {
      btn.disabled = false;
      btn.innerText = "Send Message";
    }
  };
});