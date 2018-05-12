export const createRootElement = () => {
	const injectionElement = document.querySelector(".pr-toolbar");
	if (!injectionElement) {
		return;
	}
	const rootId = "__better_github_pr";
	let element = document.querySelector("." + rootId);
	if (!element) {
		element = document.createElement("div");
		element.className = rootId;
		injectionElement.appendChild(element);
	}
	return element;
};

const sorter = (a, b) => {
	const isFileA = Boolean(a.href);
	const isFileB = Boolean(b.href);
	if (isFileA === isFileB) {
		return (b.nodeLabel > a.nodeLabel) ? -1 : ((a.nodeLabel > b.nodeLabel) ? 1 : 0);
	} else if (isFileA && !isFileB) {
		return 1;
	} else {
		return -1;
	}
};

const hasCommentsForFileIndex = (fileIndex) => {
	const diffTable = document.getElementById(`diff-${fileIndex}`);
	if (!diffTable) {
		return 0;
	}

	return diffTable.querySelectorAll(".inline-comments").length;
};

export const createFileTree = () => {
	const fileInfo = [...document.querySelectorAll(".file-info > a")];
	const files = fileInfo.map(({ title, href }) => {
		title = title.split(" → ")[0];
		return { title, href, parts: title.split("/") };
	});
	const tree = {
		nodeLabel: "/",
		list: [],
		diffElements: []
	};

	files.forEach(({ parts, href }, fileIndex) => {
		let location = tree;
		parts.forEach((part, index) => {
			let node = location.list.find(node => node.nodeLabel === part);
			if (!node) {
				const hasComments = (hasCommentsForFileIndex(fileIndex) > 0);
				const diffElement = document.getElementById(`diff-${fileIndex}`);
				tree.diffElements.push(diffElement);
				node = {
					nodeLabel: part,
					list: [],
					href: (index === parts.length - 1) ? href : null,
					hasComments,
					diffElement
				};
				location.list.push(node);
			}
			location.list = location.list.sort(sorter);
			location = node;
		});
	});
	return {
		tree,
		count: fileInfo.length
	};
};

export const isElementVisible = (el) => {
	if (!el) {
		return false;
	}

	const GITHUB_HEADER_HEIGHT = 60;

	const rect = el.getBoundingClientRect();

	const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

	const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= GITHUB_HEADER_HEIGHT);
	const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

	return (vertInView && horInView);
};
