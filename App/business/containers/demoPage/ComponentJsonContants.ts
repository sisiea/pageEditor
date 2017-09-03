export const NATIVE_IMG = {
    type: "img",
    title: "图片",
    is_native: !0,
    props: {
        src: "http://dummyimage.com/200x100/894FC4/FFF.png&text=!",
        style: {
            width: 100,
            height: 100
        }
    },
    config: {
        style: {
            width: {
                text: "宽度"
            },
            height: {
                text: "高度"
            },
            margin: {
                text: "外边距",
                type: "4-value"
            }
        }
    }
}

export const NATIVE_DIV = {
    type: "div",
    title: "通用布局块",
    is_native: !0,
    can_place: !0,
    props: {
        style: {
            minHeight: 200,
            padding: "20px",
            margin: "0px"
        }
    },
    config: {
        style: {
            padding: {
                text: "内间距",
                type: "4-value"
            },
            margin: {
                text: "外边距",
                type: "4-value"
            },
            backgroundColor: {
                text: "背景色",
                type: "color"
            },
            borderWidth: {
                text: "边框宽度"
            },
            borderColor: {
                text: "边框颜色",
                type: "color"
            },
            borderStyle: {
                text: "边框类型",
                enum: ["solid", "dotted", "dashed"]
            }
        }
    }
}

export const ANTD_BUTTON = {
    type: "Button",
    title: "按钮",
    props: {
        type: "primary",
        content: "按钮一只",
        style: {
            margin: "0px 10px 0px 0px"
        }
    },
    config: {
        type: {
            text: "主题",
            enum: ["primary", "default", "dashed", "danger"]
        },
        icon: {
            text: "图标"
        },
        content: {
            text: "文案"
        },
        style: {
            width: {
                text: "宽度"
            },
            margin: {
                text: "外边距",
                type: "4-value"
            }
        }
    }
}

export const ANTD_ROW_2 = {
    type: "Row",
    title: "2列栅格",
    childrens: [{
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 4,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }, {
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 20,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }],
    props: {}
}

export const ANTD_ROW_3 = {
    type: "Row",
    title: "3列栅格",
    childrens: [{
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 8,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }, {
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 8,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }, {
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 8,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }],
    props: {}
}

export const ANTD_ROW_4 = {
    type: "Row",
    title: "4列栅格",
    childrens: [{
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 6,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }, {
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 6,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }, {
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 6,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }, {
        type: "Col",
        title: "栅格单元",
        can_place: !0,
        props: {
            span: 6,
            style: {
                minHeight: 30
            }
        },
        config: {
            span: {
                text: "栅格",
                enum: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            }
        }
    }],
    props: {}
}