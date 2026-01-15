import type { Component } from 'svelte';
import {
	HelpCircle,
	Workflow,
	Check,
	ArrowRight,
	ArrowLeft,
	Star,
	Heart,
	Settings,
	User,
	Mail,
	Phone,
	Calendar,
	Clock,
	FileText,
	Image as ImageIcon,
	Link as LinkIcon,
	Download,
	Upload,
	Search,
	Menu,
	X,
	Plus,
	Minus,
	Pencil,
	Trash2,
	Save,
	Copy,
	Share2,
	Bell,
	Home,
	Info,
	AlertCircle
} from '@lucide/svelte';

/**
 * Icon Registry - Single source of truth for all icons in the block system.
 * Only icons in this registry can be used. Unknown icons degrade gracefully.
 */

export const ICONS: Record<string, Component> = {
	workflow: Workflow,
	check: Check,
	'arrow-right': ArrowRight,
	'arrow-left': ArrowLeft,
	star: Star,
	heart: Heart,
	settings: Settings,
	user: User,
	mail: Mail,
	phone: Phone,
	calendar: Calendar,
	clock: Clock,
	'file-text': FileText,
	image: ImageIcon,
	link: LinkIcon,
	download: Download,
	upload: Upload,
	search: Search,
	menu: Menu,
	x: X,
	plus: Plus,
	minus: Minus,
	edit: Pencil,
	'trash-2': Trash2,
	save: Save,
	copy: Copy,
	'share-2': Share2,
	bell: Bell,
	home: Home,
	info: Info,
	'alert-circle': AlertCircle
};

export const ICON_KEYS = Object.keys(ICONS);

/**
 * Get icon component by key with fallback to HelpCircle for unknown icons.
 * This ensures rendering never crashes due to missing icons.
 */
export function getIcon(iconKey: string): Component {
	return ICONS[iconKey] ?? HelpCircle;
}
