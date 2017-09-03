import * as React from 'react';
const DraggableComponent = (WrappedComponent: typeof React.Component) =>
    class DraggableHOC extends React.Component<any, any> {
        constructor(props) {
            super(props);
        }
        render() {
            const json = this.props['data-json'];
            const newProps = {
                draggable: true,
                onDragStart: (ev) => {
                    /*拖拽开始*/
                    //拖拽效果
                    console.log("option ondragstart");
                    console.log("dragging json");
                    console.log(json);
                    ev.dataTransfer.effectAllowed = "move";
                    ev.dataTransfer.setData("optionJsonInfo", JSON.stringify(json));
                    ev.dataTransfer.setDragImage(ev.target, 0, 0);
                    return true;
                },
                onDragEnd: (ev) => {
                    /*拖拽结束*/
                    console.log("option ondragend");
                    ev.dataTransfer.clearData("optionJsonInfo");
                    return false;
                }
            }
            return (
                <WrappedComponent {...this.props} {...newProps}></WrappedComponent>
            )
        }
    }

export default DraggableComponent;