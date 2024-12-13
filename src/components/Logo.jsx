
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
`

export default function Logo() {

  const gradients = [
    {
      name: 'Neon Pulse',
      gradient: 'linear-gradient(45deg, #3c82f6, #818cf8, #3c82f6)',
    },
    {
      name: 'Neon Pulse Intense',
      gradient: 'linear-gradient(45deg, #3c82f6, #93c5fd, #3c82f6)',
    },
    {
      name: 'Neon Pulse Dark',
      gradient: 'linear-gradient(45deg, #3c82f6, #1e40af, #3c82f6)',
    },
  ]

  const baseStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 900,
    fontSize: '3rem',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: `gradient 5s ease infinite`,
    borderRadius: '8px',
    textAlign: 'center',
    display: 'inline-block',
    textShadow: '0 0 20px rgba(60, 130, 246, 0.5)',
  }

  return (
    <div className="bg-[#020817] border-b">
      <style>{`
        ${fontImport}
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
            <div style={{...baseStyle, backgroundImage: gradients[2].gradient}} className='border-b'>LinkUni</div>
    </div>
  )
}