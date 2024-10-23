import './globals.css';

export const metadata = {
  title: 'BlackPrint',
  description: 'Acquisition Intelligence Platform for CRE in Latam',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}