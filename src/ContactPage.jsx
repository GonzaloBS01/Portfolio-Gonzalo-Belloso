import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

  // If a Formspree (or similar) endpoint is configured via env var, POST there.
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
  if (endpoint) {
    setStatus('sending')
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus('success')
          setForm({ name: '', email: '', message: '' })
        } else {
          throw new Error('Network response was not ok')
        }
      })
      .catch(() => setStatus('error'))

    return
  }

  // Fallback: open user's mail client via mailto
  const subject = encodeURIComponent(`Mensaje de ${form.name || 'tu portfolio'}`)
  const body = encodeURIComponent(
    `Nombre: ${form.name}\nEmail: ${form.email}\n\nMensaje:\n${form.message}`,
  )

  window.location.href = `mailto:gonzalo.belloso.01@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="app contact-page">
      <section className="section contact-layout">
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="back-link">← Volver al portfolio</Link>
          <h1>Contacto</h1>
          <p className="contact-lead">
            Si quieres escribirme por un proyecto, una práctica o una oportunidad,
            puedes dejarme tu mensaje aquí.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </label>

            <label>
              Mensaje
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="Cuéntame en qué te puedo ayudar"
                required
              />
            </label>

            <motion.button
              type="submit"
              className="btn primary submit-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Enviar mensaje
            </motion.button>
            {status === 'sending' && <p className="form-status">Enviando…</p>}
            {status === 'success' && <p className="form-status success">Mensaje enviado — gracias.</p>}
            {status === 'error' && <p className="form-status error">Error al enviar. Prueba de nuevo o usa el email directo.</p>}
          </form>
        </motion.div>

        <aside className="contact-sidebar">
          <div className="contact-card">
            <h2>Otras vías</h2>
            <p><a href="mailto:gonzalo.belloso.01@gmail.com">gonzalo.belloso.01@gmail.com</a></p>
            <p><a href="https://www.linkedin.com/in/gonzalo-belloso-sanchez" target="_blank" rel="noreferrer">LinkedIn</a></p>
            <p><a href="https://github.com/GonzaloBS01" target="_blank" rel="noreferrer">GitHub</a></p>
          </div>
        </aside>
      </section>
    </main>
  )
}
