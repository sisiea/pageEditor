let json = [
    {
        type: 'div',
        is_native: true,
        can_place:true,
        props: {
            type: 'primary',
        },
        childrens: [
            {
                type: 'Button',
                props: {
                    type: 'primary',
                    content: 'children Button!!'
                }
            }, {
                type: 'img',
                is_native: true,
                props: {
                    src: 'http://dummyimage.com/200x100/894FC4/FFF.png&text=!',
                }

            }
        ]
    },
    {
        type: 'Button',
        props: {
            type: 'primary',
            content: 'zenmeyang!'
        }
    }
]

export default json;
