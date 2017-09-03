import * as React from 'react';

interface HighLightWordProps {
    hightlightClsName?: string,//highlight words className
    hightlightStyle?: Object,//highlight words style
    unHightlightClsName?: string,//dont need highlight words className
    unHightlightStyle?: Object,//dont need highlight words style
    text: string,//orignal text
    highlightWord: string//words needed to be highlight
}

/**
 * Highlights the first word in the prop named highlightWord(now only support the first word)
 * @return JSX
 */
export default class HighLightWord extends React.Component<HighLightWordProps, any>{
    constructor(props) {
        super(props);
    }

    /**
     * generate an Array.
     * @return Array<JSX>
     */
    private _generateTextChildren = () => {
        const { hightlightClsName, hightlightStyle, unHightlightClsName, unHightlightStyle, text, highlightWord } = this.props;
        const orignalText = text;
        let activeWord = highlightWord.split(' ')[0];//now only support the first word
        //replace '\' to '\\\\'
        activeWord = activeWord.replace(/\\/,'\\\\');
        //double escape Special characters
        const specialChar = ['(','[','{','^','$','|','?','*','+','.','}',']',')'];
        specialChar.forEach((char)=>{
            activeWord = activeWord.replace(char,'\\'+char);
        })
        const regex = new RegExp('' + activeWord + '', 'gi');
        const segments = orignalText.split(regex);
        const replacements = orignalText.match(regex);

        const textChildren = [];

        segments.forEach((segment, i) => {
            textChildren.push(
                React.DOM.span({ 
                    className: unHightlightClsName ? unHightlightClsName : '',
                    key:'seg'+i ,
                    style:unHightlightStyle
                }, segment)
            );
            if (segments.length === i + 1) {
                return;
            }
            textChildren.push(React.DOM.span({
                className: hightlightClsName ? hightlightClsName : '',
                key:'repl'+i,
                style:hightlightStyle
            }, replacements[i]))
        })
        return textChildren;
    }

    render() {
        const highlightText = this._generateTextChildren();
        return (
            <span className='hight-light-text'>
                {highlightText}
            </span>
        )
    }

}