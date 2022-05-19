import '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        quaternary: Palette['primary'];
    }
    interface PaletteOptions {
        quaternary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        quinary: Palette['primary'];
    }
    interface PaletteOptions {
        quinary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        quaternary: Palette['primary'];
    }
    interface PaletteOptions {
        quaternary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        senary: Palette['primary'];
    }
    interface PaletteOptions {
        senary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        septenary: Palette['primary'];
    }
    interface PaletteOptions {
        septenary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        octonary: Palette['primary'];
    }
    interface PaletteOptions {
        octonary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        nonary: Palette['primary'];
    }
    interface PaletteOptions {
        nonary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        denary: Palette['primary'];
    }
    interface PaletteOptions {
        denary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tertiary: true;
        quaternary: true;
        quinary: true;
        senary: true;
        septenary: true;
        octonary: true;
        nonary: true;
        denary: true;
    }
}