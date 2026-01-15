/**
 * Path Utilities - Single source of truth for all path operations.
 * Handles nested prop access, array operations, and ensures stable IDs.
 * 
 * Supports:
 * - Dot notation: "cta.label"
 * - Array notation: "features[0].title"
 * - Array operations: "features[]" for add operations
 */

/**
 * Generate a stable _id for array items.
 */
function generateId(): string {
	return `_id${Date.now()}${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Ensure an object has an _id field. If missing, generate one.
 */
function ensureId(item: Record<string, unknown>): Record<string, unknown> {
	if (!item._id || typeof item._id !== 'string') {
		return { ...item, _id: generateId() };
	}
	return item;
}

/**
 * Parse a path into segments (handles dot notation and array indices).
 */
function parsePath(path: string): Array<string | number> {
	const segments: Array<string | number> = [];
	let current = '';
	let inBrackets = false;
	let bracketContent = '';

	for (let i = 0; i < path.length; i++) {
		const char = path[i];

		if (char === '[') {
			if (current) {
				segments.push(current);
				current = '';
			}
			inBrackets = true;
			bracketContent = '';
		} else if (char === ']') {
			inBrackets = false;
			const num = parseInt(bracketContent, 10);
			if (!isNaN(num)) {
				segments.push(num);
			} else {
				segments.push(bracketContent);
			}
			bracketContent = '';
		} else if (inBrackets) {
			bracketContent += char;
		} else if (char === '.' && current) {
			segments.push(current);
			current = '';
		} else if (char !== '.') {
			current += char;
		}
	}

	if (current) {
		segments.push(current);
	}

	return segments;
}

/**
 * Get a nested value from an object by path.
 */
export function getValueByPath(
	obj: Record<string, unknown>,
	path: string
): unknown {
	const segments = parsePath(path);
	let current: unknown = obj;

	for (const segment of segments) {
		if (current === null || current === undefined) {
			return undefined;
		}

		if (typeof current === 'object' && !Array.isArray(current)) {
			current = (current as Record<string, unknown>)[segment as string];
		} else if (Array.isArray(current) && typeof segment === 'number') {
			current = current[segment];
		} else {
			return undefined;
		}
	}

	return current;
}

/**
 * Set a nested value in an object by path.
 * Creates intermediate objects/arrays as needed.
 */
export function setValueByPath(
	obj: Record<string, unknown>,
	path: string,
	value: unknown
): void {
	const segments = parsePath(path);
	if (segments.length === 0) {
		return;
	}

	let current: Record<string, unknown> = obj;

	for (let i = 0; i < segments.length - 1; i++) {
		const segment = segments[i];
		const nextSegment = segments[i + 1];

		if (typeof segment === 'string') {
			if (!(segment in current) || typeof current[segment] !== 'object' || current[segment] === null) {
				// Determine if next segment is a number (array index) or string (object key)
				if (typeof nextSegment === 'number') {
					current[segment] = [];
				} else {
					current[segment] = {};
				}
			}
			current = current[segment] as Record<string, unknown>;
		} else if (typeof segment === 'number') {
			// We're in an array
			if (!Array.isArray(current)) {
				throw new Error(`Cannot use array index on non-array at path: ${path}`);
			}
			const arr = current as unknown[];
			if (segment >= arr.length) {
				// Extend array
				for (let j = arr.length; j <= segment; j++) {
					arr.push({});
				}
			}
			if (typeof nextSegment === 'number') {
				if (!Array.isArray(arr[segment])) {
					arr[segment] = [];
				}
				current = arr[segment] as unknown as Record<string, unknown>;
			} else {
				if (typeof arr[segment] !== 'object' || arr[segment] === null) {
					arr[segment] = {};
				}
				current = arr[segment] as unknown as Record<string, unknown>;
			}
		}
	}

	const lastSegment = segments[segments.length - 1];
	if (typeof lastSegment === 'string') {
		current[lastSegment] = value;
	} else if (typeof lastSegment === 'number') {
		if (!Array.isArray(current)) {
			throw new Error(`Cannot use array index on non-array at path: ${path}`);
		}
		const arr = current as unknown[];
		if (lastSegment >= arr.length) {
			for (let j = arr.length; j <= lastSegment; j++) {
				arr.push(undefined);
			}
		}
		arr[lastSegment] = value;
	}
}

/**
 * Add an item to an array at the given path.
 * Auto-generates _id if missing.
 */
export function addArrayItem(
	obj: Record<string, unknown>,
	path: string,
	item: Record<string, unknown>
): void {
	const array = getValueByPath(obj, path);

	if (!Array.isArray(array)) {
		throw new Error(`Path ${path} does not point to an array`);
	}

	const itemWithId = ensureId(item);
	array.push(itemWithId);
}

/**
 * Remove an item from an array by index.
 */
export function removeArrayItem(
	obj: Record<string, unknown>,
	path: string,
	index: number
): void {
	const array = getValueByPath(obj, path);

	if (!Array.isArray(array)) {
		throw new Error(`Path ${path} does not point to an array`);
	}

	if (index >= 0 && index < array.length) {
		array.splice(index, 1);
	}
}

/**
 * Remove an item from an array by _id.
 */
export function removeArrayItemById(
	obj: Record<string, unknown>,
	path: string,
	id: string
): void {
	const array = getValueByPath(obj, path);

	if (!Array.isArray(array)) {
		throw new Error(`Path ${path} does not point to an array`);
	}

	const index = array.findIndex(
		(item) => typeof item === 'object' && item !== null && (item as Record<string, unknown>)._id === id
	);

	if (index !== -1) {
		array.splice(index, 1);
	}
}

/**
 * Get the array path (without index) from a path that may include an index.
 * Example: "features[0].title" -> "features"
 */
export function getArrayPath(path: string): string {
	const segments = parsePath(path);
	const arraySegments: Array<string | number> = [];

	for (const segment of segments) {
		if (typeof segment === 'number') {
			break;
		}
		arraySegments.push(segment);
	}

	return arraySegments.join('.');
}
