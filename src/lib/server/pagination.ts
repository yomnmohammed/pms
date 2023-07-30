export function paging(url: URL, limit = 10): Paging {
	const currentPage = numberOrZero(url.searchParams.get('page'));

	return {
		data: {
			take: limit,
			skip: currentPage * limit
		},
		aggregation: {
			take: limit,
			skip: (currentPage + 1) * limit
		},
		meta: (count: number) => {
			return {
				hasNextPage: !!count,
				hasPrevPage: currentPage > 0,
				nextPageUrl: calculateNextPageUrl(url, count, currentPage),
				prevPageUrl: calculatePrevPageUrl(url, count, currentPage)
			};
		}
	};
}

function calculateNextPageUrl(url: URL, count: number, currentPage: number) {
	if (!count) return null;
	url.searchParams.set('page', `${currentPage + 1}`);
	return `${url.origin}${url.pathname}?${url.searchParams.toString()}`;
}
function calculatePrevPageUrl(url: URL, count: number, currentPage: number) {
	if (currentPage <= 0) return null;
	url.searchParams.set('page', `${currentPage - 1}`);
	return `${url.origin}${url.pathname}?${url.searchParams.toString()}`;
}
function numberOrZero(n: string | null): number {
	const num = Number(n);
	if (num) {
		return num;
	}
	return 0;
}

type Paging = {
	data: {
		take: number;
		skip: number;
	};
	aggregation: {
		take: number;
		skip: number;
	};
	meta: (count: number) => {
		hasNextPage: boolean;
		nextPageUrl: string | null;
		hasPrevPage: boolean;
		prevPageUrl: string | null;
	};
};
