import React from 'react';
import { AppBar, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    // @ts-ignore
    const languages: string[] = Object.keys(i18n.options.resources);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    {t('Kartka z areny')}
                </Typography>
                <ToggleButtonGroup
                    exclusive
                    value={i18n.resolvedLanguage}
                    onChange={(e, lang) => i18n.changeLanguage(lang)}
                >
                    {languages.map((lang) => (
                        <ToggleButton key={lang} value={lang}>
                            {lang}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
