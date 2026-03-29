export function buildEmailTemplate(data) {
  const { headline, breaking = [], tools = [], trends = [], must_read = [], insights = [] } = data;
  return `
  <div style="font-family: Arial, sans-serif; background:#0f172a; color:#e2e8f0; padding:20px;">
    
    <h1 style="color:#38bdf8;">🤖 AI Daily Digest</h1>
    <p style="color:#94a3b8;">${new Date().toLocaleDateString()}</p>

    <hr style="border:1px solid #1e293b"/>

    <h2 style="color:#facc15;">⚡ Breaking News</h2>
    <ul>
      ${breaking.map(item => {
        if (typeof item === 'string') return `<li>${item}</li>`;
        if (item.title) return `<li><b>${item.title}</b><br/>${item.summary || ''}<br/><a href="${item.link || '#'}">Read more</a></li>`;
        return `<li>${JSON.stringify(item)}</li>`;
      }).join("")}
    </ul>

    <h2 style="color:#4ade80;">🛠️ Tools & Products</h2>
    <ul>
      ${tools.map(item => {
        if (typeof item === 'string') return `<li>${item}</li>`;
        if (item.title) return `<li><b>${item.title}</b><br/>${item.summary || ''}<br/><a href="${item.link || '#'}">Explore</a></li>`;
        return `<li>${JSON.stringify(item)}</li>`;
      }).join("")}
    </ul>

    <h2 style="color:#c084fc;">📈 Trends</h2>
    <ul>
      ${trends.map(item => {
        if (typeof item === 'string') return `<li>${item}</li>`;
        if (item.title) return `<li><b>${item.title}</b><br/>${item.summary || ''}<br/><a href="${item.link || '#'}">Read more</a></li>`;
        return `<li>${JSON.stringify(item)}</li>`;
      }).join("")}
    </ul>
    
    <h2 style="color:#c084fc;">📚 Must Read</h2>
    <ul>
      ${must_read.map(item => {
        if (typeof item === 'string') return `<li>${item}</li>`;
        if (item.title) return `<li><b>${item.title}</b><br/>${item.summary || ''}<br/><a href="${item.link || '#'}">Read more</a></li>`;
        return `<li>${JSON.stringify(item)}</li>`;
      }).join("")}
    </ul>

    <h2 style="color:#fb7185;">🔥 Insights</h2>
    <ol>
      ${insights.map(item => {
        if (typeof item === 'string') return `<li>${item}</li>`;
        return `<li>${JSON.stringify(item)}</li>`;
      }).join("")}
    </ol>

    <hr style="border:1px solid #1e293b"/>

    <p style="color:#64748b;">
      You’re receiving this because you love AI 🚀
    </p>

  </div>
  `;
}