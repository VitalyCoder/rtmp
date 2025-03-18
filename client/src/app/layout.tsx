import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
	title: {
		absolute: 'any', // Устанавливает абсолютное название сайта
		template: `%s | any`, // Использует шаблон с %s для динамических страниц
	},
	description: 'any', // Описание сайта или страницы
	metadataBase: new URL('https://devsynergy.ru'), // Базовый URL для относительных ссылок
	openGraph: {
		type: 'website', // Тип Open Graph
		siteName: 'any', // Название сайта для Open Graph
		url: 'https://devsynergy.ru', // URL страницы для Open Graph
		images: [
			{
				url: `https://devsynergy.ru/vercel.svg`, // Изображение для Open Graph
				width: 1200,
				height: 630,
				alt: 'Описание изображения',
			},
		],
	},
	twitter: {
		card: 'summary_large_image', // Карта Twitter с большим изображением
		site: '@your_twitter', // Твиттер-аккаунт сайта
		creator: '@creator_twitter', // Твиттер-аккаунт автора
	},
	robots: {
		index: true, // Страница может быть проиндексирована
		follow: true, // Ссылки на странице могут быть проиндексированы
	},
	icons: [
		{
			rel: 'icon', // Тип иконки
			url: '/vercel.svg', // Путь к иконке
			sizes: 'any',
		},
	],
	appleWebApp: {
		capable: true, // Поддержка Apple Web App
		title: 'any', // Название приложения
		statusBarStyle: 'black-translucent', // Стиль строки состояния на iOS
	},
};

export const viewport: Viewport = {
	width: 'device-width', // Ширина экрана устройства
	initialScale: 1, // Начальный масштаб
	maximumScale: 1, // Максимальный масштаб
	themeColor: 'dark',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head />
			<body>{children}</body>
		</html>
	);
}
