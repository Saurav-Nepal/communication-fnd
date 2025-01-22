import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
    title: 'Typography',
    component: Typography,
    argTypes: {
        as: {
            type: 'string',
            table: {
                defaultValue: { summary: 'span' },
            },
        },
    },
};

export default meta;

// Font variant stories

export const Title: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Title.args = {
    variant: 'title',
    children: 'Title',
    as: 'p',
};

export const Heading: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Heading.args = {
    variant: 'heading',
    children: 'Heading',
    as: 'p',
};

export const SubHeading: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

SubHeading.args = {
    variant: 'subHeading',
    children: 'SubHeading',
    as: 'p',
};

export const Info: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Info.args = {
    variant: 'info',
    children: 'Info',
    as: 'p',
};

export const SubInfo: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

SubInfo.args = {
    variant: 'subInfo',
    children: 'SubInfo',
    as: 'p',
};

// Font size stories

export const TextXs: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextXs.args = {
    size: 'xs',
    children: 'xs',
    as: 'p',
};

export const TextSm: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextSm.args = {
    size: 'sm',
    children: 'sm',
    as: 'p',
};

export const TextMd: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextMd.args = {
    size: 'md',
    children: 'md',
    as: 'p',
};

export const TextLg: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextLg.args = {
    size: 'lg',
    children: 'lg',
    as: 'p',
};

export const TextXl: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextXl.args = {
    size: 'xl',
    children: 'xl',
    as: 'p',
};

export const Text2Xl: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Text2Xl.args = {
    size: '2xl',
    children: '2xl',
    as: 'p',
};

export const Text3Xl: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Text3Xl.args = {
    size: '3xl',
    children: '3xl',
    as: 'p',
};

// Font Weight Stories

export const Bold: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Bold.args = {
    weight: 'bold',
    children: 'Bold',
    as: 'p',
};

export const SemiBold: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

SemiBold.args = {
    weight: 'semibold',
    children: 'SemiBold',
    as: 'p',
};

export const Medium: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Medium.args = {
    weight: 'medium',
    children: 'Medium',
    as: 'p',
};

export const Normal: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Normal.args = {
    weight: 'normal',
    children: 'Normal',
    as: 'p',
};

// Text transform stories

export const Uppercase: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Uppercase.args = {
    transform: 'uppercase',
    children: 'Uppercase',
    as: 'p',
};

export const Lowercase: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Lowercase.args = {
    transform: 'lowercase',
    children: 'Lowercase',
    as: 'p',
};

export const Capitalize: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

Capitalize.args = {
    transform: 'capitalize',
    children: 'Capitalize',
    as: 'p',
};

export const None: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

None.args = {
    transform: 'none',
    children: 'None',
    as: 'p',
};

// Font style stories

export const FontStyleItalic: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

FontStyleItalic.args = {
    fontStyle: 'italic',
    children: 'Italic',
    as: 'p',
};

export const FontStyleNormal: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

FontStyleNormal.args = {
    fontStyle: 'normal',
    children: 'Normal',
    as: 'p',
};

// Text color stories

export const TextPrimary: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextPrimary.args = {
    color: 'primary',
    children: 'Primary',
    as: 'p',
};

export const TextSecondary: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextSecondary.args = {
    color: 'secondary',
    children: 'Secondary',
    as: 'p',
};

export const TextWarning: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextWarning.args = {
    color: 'warning',
    children: 'Warning',
    as: 'p',
};

export const TextAccent: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextAccent.args = {
    color: 'accent',
    children: 'Accent',
    as: 'p',
};

export const TextDestructive: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextDestructive.args = {
    color: 'destructive',
    children: 'Destructive',
    as: 'p',
};

export const TextMuted: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextMuted.args = {
    color: 'muted',
    children: 'Muted',
    as: 'p',
};

export const TextSuccess: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextSuccess.args = {
    color: 'success',
    children: 'Success',
    as: 'p',
};

export const TextInfo: StoryFn<typeof Typography> = ({ ...args }) => {
    return <Typography {...args} />;
};

TextInfo.args = {
    color: 'info',
    children: 'Info',
    as: 'p',
};
