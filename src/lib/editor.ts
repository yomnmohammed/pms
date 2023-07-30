/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import CodeBox from '@bomdi/codebox';
// @ts-ignore
import MermaidTool from 'editorjs-mermaid';
// @ts-ignore
import TOC from '@phigoro/editorjs-toc';

import EditorJS, { type OutputBlockData, type OutputData } from '@editorjs/editorjs';

import edjsHTML from '@dcheglakov/editorjs-html';
import { get, writable } from 'svelte/store';
function mermaidParser(block: { data: { code: string; caption: string } }) {
	return `<pre class="mermaid bg-white">
    ${block.data.code}
    
    </pre>
    <div class="text-center">${block.data.caption}</div>
    `;
}
type TOCItem = {
	id: string;
	reference: string;
	text: string;
	level: 1 | 2 | 3 | 4 | 5 | 6;
};
const sizes = {
	1: 'lg',
	2: 'md',
	3: 'sm',
	4: 'xs',
	5: 'xs',
	6: 'xs'
};
function TOCParser(block: OutputBlockData<'toc', { items: TOCItem[] }>) {
	const { items } = block.data.items.reduce(
		(prev: { lastLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6; items: TOCItem[][] }, curr) => {
			if (prev.lastLevel < curr.level) {
				const arr = prev.items.at(-1);
				if (Array.isArray(arr)) arr.push(curr);
			} else {
				console.log({ prev: prev.lastLevel, curr: curr.level });
				prev.items.push([curr]);
			}
			prev.lastLevel = curr.level;
			return prev;
		},
		{ lastLevel: 0, items: [[]] }
	);
	const parsedResult = items.reduce((text: string, item: TOCItem[]) => {
		return (
			text +
			`<div class="flex flex-col">` +
			item.reduce((text: string, block) => {
				return (
					text +
					`<a href="#${block.reference}" class="ml-${block.level * 2} font-semibold text-${
						sizes[block.level]
					}">${block.text}</a>`
				);
			}, '') +
			'</div>'
		);
	}, '');

	return parsedResult;
}
export function parseJsonEditor(data: OutputData) {
	const edjsParser = edjsHTML({
		mermaid: mermaidParser,
		toc: TOCParser,
		header: (block: OutputBlockData<'header', { level: 1 | 2 | 3 | 4 | 5 | 6; text: string }>) => {
			return `<h${block.data.level} id=${block.id}>${block.data.text}</h$>`;
		}
	});
	const HTML = edjsParser.parse(data);

	return HTML.join(' ');
}
export const editorData = writable<OutputData>();

export default function editor(node: HTMLElement) {
	const data = get(editorData);

	const editor = new EditorJS({
		data: data,
		holder: node,
		tools: {
			paragraph: {
				class: Paragraph,
				inlineToolbar: true
			},
			table: Table,
			header: {
				class: Header,
				inlineToolbar: true
			},
			checklist: {
				class: Checklist,
				inlineToolbar: true
			},
			list: {
				class: List,
				inlineToolbar: true,
				config: {
					defaultStyle: 'unordered'
				}
			},
			Marker: {
				class: Marker,
				shortcut: 'CMD+SHIFT+M'
			},
			code: CodeBox,
			inlineCode: {
				class: InlineCode
			},
			toc: TOC,
			mermaid: MermaidTool
		},
		async onChange() {
			const data = await editor.save();
			editorData.set(data);
		},
		i18n: {
			direction: 'rtl'
		}
	});

	return {
		destroy() {
			editor.destroy();
		}
	};
}
