class I18N {
    lang: string = 'zh-CN';
    constructor(lang = navigator.language) {
        if (lang) this.lang = lang;
    }

    setLang = (lang: string) => {
        this.lang = lang;
    }
}

export default I18N;
