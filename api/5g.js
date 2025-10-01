import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  try {
    // URL folder remote yang ingin di-scrape
    const remoteFolderUrl = 'https://sansserif.cloud/images/5g/';

    // Fetch halaman HTML
    const response = await fetch(remoteFolderUrl);
    if (!response.ok) throw new Error('Failed to fetch remote folder');

    const html = await response.text();

    // Parse HTML menggunakan JSDOM
    const dom = new JSDOM(html);

    // Ambil semua link <a> yang mengarah ke file gambar
    const links = Array.from(dom.window.document.querySelectorAll('a'))
      .map(a => a.href)
      .filter(href => href.match(/\.(png|jpg|jpeg|webp|gif)$/i));

    // Buat JSON output
    const data = links.map(link => {
      // Jika link relatif, ubah jadi absolute URL
      const url = link.startsWith('http') ? link : remoteFolderUrl + link;
      const filename = url.split('/').pop();
      return {
        id: filename.replace(/\.[^/.]+$/, ''),
        title: filename.replace(/\.[^/.]+$/, ''),
        imageUrl: url
      };
    });

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
}
