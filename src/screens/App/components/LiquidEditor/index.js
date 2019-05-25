import React, { useState } from 'react'
import AceEditor from 'react-ace'
import { ReactLiquid } from 'react-liquid'
import {
  ObjectRootLabel, ObjectLabel, ObjectInspector,
  ObjectName, ObjectValue
} from 'react-inspector'

import 'brace/mode/liquid'
import 'brace/theme/solarized_dark'

export default function LiquidEditor() {
  const [template, setTemplate] = useState("Foo")
  const [contentContext, setContentContext] = useState({foo:'bar'})

  function onTemplateChange(newTemplate) {
    return setTemplate(newTemplate)
  }


  function onNodeClick(node) {
    console.log(node.currentTarget);
  }

  const ClickableObjectLabel = ({ name, data, isNonenumerable = false }) => {
    const object = data;

    return (
      <span onClick={onNodeClick}>
        <ObjectName name={name} dimmed={isNonenumerable} />
        <span>: </span>
        <ObjectValue object={object} />
      </span>
    );
  };

  const nodeRenderer = ({ depth, name, data, isNonenumerable }) =>
    depth === 0 ? (
      <ObjectRootLabel name={name} data={data} />
    ) : (
      <ClickableObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
    );

  return (
    <div>
      <AceEditor
        mode="liquid"
        theme="solarized_dark"
        value={template}
        height="100px"
        onChange={onTemplateChange} />

      <ReactLiquid
        template={template}
        data={contentContext} />

      <ObjectInspector
        data={contentContext}
        nodeRenderer={nodeRenderer} />
    </div>
  )
}

//export default class LiquidEditor extends React.Component {
//  constructor(props) {
//    super(props)
//    this.state = {
//      template: props.template || "Hello World",
//      context: {}
//    }
//  }
//
//  onTemplateChange(newTemplate) {
//    this.setState({template: newTemplate})
//  }
//
//  render() {
//    return (
//      <div>
//        <AceEditor
//          mode="liquid"
//          theme="solarized_dark"
//          value={this.state.template}
//          height="100px"
//          onChange={this.onTemplateChange} />
//
//        <ReactLiquid
//          template={this.state.template} />
//      </div>
//    )
//  }
//}
