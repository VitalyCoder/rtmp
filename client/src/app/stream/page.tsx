'use client';

import { useEffect, useState } from 'react';

const HtmlDisplay = () => {
	const [htmlContent, setHtmlContent] = useState<string | null>(null);

	useEffect(() => {
		const fetchHtmlContent = async () => {
			try {
				const res = await fetch('https://devsynergy.ru/backend/api/v1/stream');

				if (!res.ok) {
					throw new Error(`Ошибка сети: ${res.statusText}`);
				}

				const text = await res.text();
				console.log('HTML получен:', text);

				setHtmlContent(text);
			} catch (err) {
				console.error('Ошибка загрузки:', err);
			}
		};

		fetchHtmlContent();
	}, []);

	useEffect(() => {
		if (htmlContent) {
			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js';
			script.async = true;
			script.onload = () => {
				console.log('Hls.js loaded successfully');
			};
			script.onerror = () => {
				console.error('Failed to load Hls.js');
			};
			document.body.appendChild(script);
		}

		return () => {
			const script = document.querySelector(
				'script[src="https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js"]'
			);
			if (script) {
				document.body.removeChild(script);
			}
		};
	}, [htmlContent]);

	return (
		<div>
			{htmlContent ? (
				<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
			) : (
				<p>Загрузка...</p>
			)}
		</div>
	);
};

export default HtmlDisplay;
