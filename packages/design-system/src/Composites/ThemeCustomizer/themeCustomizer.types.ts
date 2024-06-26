//The themeColorList constant is an array of color objects. Each object represents a color category and may have a title and a key property. The color categories include Primary Colors, Secondary Colors, Accent Colors, Neutral Colors, Status Colors, and Base Colors.
export const themeColorList = [
    {
        title: 'Primary Colors',
    },
    {
        title: 'Primary',
        key: 'p',
    },
    {
        title: 'Primary Focus',
        key: 'pf',
    },
    {
        title: 'Primary Content',
        key: 'pc',
    },
    {
        title: 'Secondary Colors',
    },
    {
        title: 'Secondary',
        key: 's',
    },
    {
        title: 'Secondary Focus',
        key: 'sf',
    },
    {
        title: 'Secondary Content',
        key: 'sc',
    },
    {
        title: 'Accent Colors',
    },
    {
        title: 'Accent',
        key: 'a',
    },
    {
        title: 'Accent Focus',
        key: 'af',
    },
    {
        title: 'Accent Content',
        key: 'ac',
    },
    {
        title: 'Neutral Colors',
    },
    {
        title: 'Neutral',
        key: 'n',
    },
    {
        title: 'Neutral Focus',
        key: 'nf',
    },
    {
        title: 'Neutral Content',
        key: 'nc',
    },

    {
        title: 'Status Colors',
    },
    {
        title: 'Success',
        key: 'su',
    },
    {
        title: 'Info',
        key: 'in',
    },
    {
        title: 'Warning',
        key: 'wa',
    },
    {
        title: 'Error',
        key: 'er',
    },
    {
        title: 'Base Colors',
    },
    {
        title: 'Base 100',
        key: 'b1',
    },
    {
        title: 'Base 200',
        key: 'b2',
    },
    {
        title: 'Base 300',
        key: 'b3',
    },
    {
        title: 'Base Content',
        key: 'bc',
    },
];

//The getHSLColor function takes a color as a string and returns the color in HSL format. HSL stands for Hue, Saturation, and Lightness.
export const getHSLColor = (color: string) => {
    return `hsl(${color})`;
};

//The convertHSLObjectToString function takes an HSL object as input and converts it to a string representation. The input object should have h, s, and l properties representing the hue, saturation, and lightness values respectively.
export const convertHSLObjectToString = (hsl: any) => {
    if (!hsl) return null;
    return `${hsl.h} ${hsl.s * 100}% ${hsl.l * 100}%`;
};

//The getFonts function is an asynchronous function that retrieves the available fonts in the user's system. It uses the document.fonts API to check the availability of different font names. The function returns a promise that resolves to an array of available font names sorted alphabetically.
export const getFonts = async () => {
    const fontCheck = new Set(
        [
            // Windows 10
            'Arial',
            'Arial Black',
            'Bahnschrift',
            'Calibri',
            'Cambria',
            'Cambria Math',
            'Candara',
            'Comic Sans MS',
            'Consolas',
            'Constantia',
            'Corbel',
            'Courier New',
            'Ebrima',
            'Franklin Gothic Medium',
            'Gabriola',
            'Gadugi',
            'Georgia',
            'HoloLens MDL2 Assets',
            'Impact',
            'Ink Free',
            'Javanese Text',
            'Leelawadee UI',
            'Lucida Console',
            'Lucida Sans Unicode',
            'Malgun Gothic',
            'Marlett',
            'Microsoft Himalaya',
            'Microsoft JhengHei',
            'Microsoft New Tai Lue',
            'Microsoft PhagsPa',
            'Microsoft Sans Serif',
            'Microsoft Tai Le',
            'Microsoft YaHei',
            'Microsoft Yi Baiti',
            'MingLiU-ExtB',
            'Mongolian Baiti',
            'MS Gothic',
            'MV Boli',
            'Myanmar Text',
            'Nirmala UI',
            'Palatino Linotype',
            'Segoe MDL2 Assets',
            'Segoe Print',
            'Segoe Script',
            'Segoe UI',
            'Segoe UI Historic',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'SimSun',
            'Sitka',
            'Sylfaen',
            'Symbol',
            'Tahoma',
            'Times New Roman',
            'Trebuchet MS',
            'Verdana',
            'Webdings',
            'Wingdings',
            'Yu Gothic',
            // macOS
            'American Typewriter',
            'Andale Mono',
            'Arial',
            'Arial Black',
            'Arial Narrow',
            'Arial Rounded MT Bold',
            'Arial Unicode MS',
            'Avenir',
            'Avenir Next',
            'Avenir Next Condensed',
            'Baskerville',
            'Big Caslon',
            'Bodoni 72',
            'Bodoni 72 Oldstyle',
            'Bodoni 72 Smallcaps',
            'Bradley Hand',
            'Brush Script MT',
            'Chalkboard',
            'Chalkboard SE',
            'Chalkduster',
            'Charter',
            'Cochin',
            'Comic Sans MS',
            'Copperplate',
            'Courier',
            'Courier New',
            'Didot',
            'DIN Alternate',
            'DIN Condensed',
            'Futura',
            'Geneva',
            'Georgia',
            'Gill Sans',
            'Helvetica',
            'Helvetica Neue',
            'Herculanum',
            'Hoefler Text',
            'Impact',
            'Lucida Grande',
            'Luminari',
            'Marker Felt',
            'Menlo',
            'Microsoft Sans Serif',
            'Monaco',
            'Noteworthy',
            'Optima',
            'Palatino',
            'Papyrus',
            'Phosphate',
            'Rockwell',
            'Savoye LET',
            'SignPainter',
            'Skia',
            'Snell Roundhand',
            'Tahoma',
            'Times',
            'Times New Roman',
            'Trattatello',
            'Trebuchet MS',
            'Verdana',
            'Zapfino',
        ].sort()
    );

    return await (async () => {
        await document.fonts.ready;

        const fontAvailable = new Set();

        for (const font of fontCheck.values()) {
            if (document.fonts.check(`12px "${font}"`)) {
                fontAvailable.add(font);
            }
        }

        document.fonts.forEach((font) => {
            fontAvailable.add(font.family);
        });

        return Array.from(fontAvailable.values()).sort();
    })();
};
