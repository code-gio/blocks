import { z } from 'zod';
import type { BlockDefinition } from '../types';
import FeaturesSection from '../components/FeaturesSection.svelte';

const featureSchema = z.object({
	_id: z.string(),
	iconKey: z.string(),
	title: z.string(),
	description: z.string()
});

const propsSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	features: z.array(featureSchema).default([]),
	variant: z.enum(['default', 'secondary', 'outline']).optional().default('default'),
	density: z.enum(['compact', 'comfortable']).optional().default('comfortable'),
	align: z.enum(['left', 'center', 'right']).optional().default('left'),
	columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional().default(3)
});

export const featuresSectionDefinition: BlockDefinition = {
	type: 'features.section',
	displayName: 'Features Section',
	version: 1,
	defaults: {
		title: 'Features',
		description: 'Discover what makes us special',
		features: [
			{
				_id: '_id1',
				iconKey: 'workflow',
				title: 'Feature One',
				description: 'This is the first feature description.'
			},
			{
				_id: '_id2',
				iconKey: 'check',
				title: 'Feature Two',
				description: 'This is the second feature description.'
			},
			{
				_id: '_id3',
				iconKey: 'star',
				title: 'Feature Three',
				description: 'This is the third feature description.'
			}
		],
		variant: 'default',
		density: 'comfortable',
		align: 'left',
		columns: 3
	},
	schema: propsSchema,
	ui: [
		{
			path: 'title',
			label: 'Title',
			kind: 'string',
			placeholder: 'Enter section title'
		},
		{
			path: 'description',
			label: 'Description',
			kind: 'text',
			placeholder: 'Enter section description'
		},
		{
			path: 'variant',
			label: 'Variant',
			kind: 'enum',
			options: [
				{ value: 'default', label: 'Default' },
				{ value: 'secondary', label: 'Secondary' },
				{ value: 'outline', label: 'Outline' }
			]
		},
		{
			path: 'density',
			label: 'Density',
			kind: 'enum',
			options: [
				{ value: 'compact', label: 'Compact' },
				{ value: 'comfortable', label: 'Comfortable' }
			]
		},
		{
			path: 'align',
			label: 'Alignment',
			kind: 'enum',
			options: [
				{ value: 'left', label: 'Left' },
				{ value: 'center', label: 'Center' },
				{ value: 'right', label: 'Right' }
			]
		},
		{
			path: 'columns',
			label: 'Columns',
			kind: 'enum',
			options: [
				{ value: '2', label: '2 Columns' },
				{ value: '3', label: '3 Columns' },
				{ value: '4', label: '4 Columns' }
			]
		},
		{
			path: 'features',
			label: 'Features',
			kind: 'array',
			itemSchema: [
				{
					path: 'iconKey',
					label: 'Icon',
					kind: 'icon'
				},
				{
					path: 'title',
					label: 'Title',
					kind: 'string',
					required: true
				},
				{
					path: 'description',
					label: 'Description',
					kind: 'text',
					required: true
				}
			]
		}
	],
	migrate: (props, fromVersion) => {
		// No migration needed for v1, but structure is in place for future versions
		return props;
	}
};

// Export component for registry
export { FeaturesSection };
