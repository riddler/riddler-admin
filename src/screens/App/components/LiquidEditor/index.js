import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import { ReactLiquid } from 'react-liquid'
import { ObjectInspector } from 'react-inspector'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Predicator from 'predicator'

import 'brace/mode/liquid'
import 'brace/theme/solarized_dark'
import 'brace/ext/language_tools'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }
}))


export default function LiquidEditor(props) {
  const classes = useStyles();
  const [initialized, setInitialized] = useState(false)
  //const [contexts, setContexts] = useState(props.contexts || {})
  const [contextIndex, setContextIndex] = useState(0)
  //const [contextData, setContextData] = useState((props.contexts[contextIndex] || {}).data)
  const [template, setTemplate] = useState(props.template)
  //const [contentContext, setContentContext] = useState({foo:'bar'})

  //const contexts = [
  //  {name: 'Member Bob', data: {member:{name: 'Bob'}}},
  //  {name: 'Member Alice', data: {member:{name: 'Alice'}}}
  //]

  const aceEditorRef = React.createRef()

  useEffect(() => {
    //if (!initialized) {
      //aceEditorRef.acerequire("foo")
      console.log(aceEditorRef.editor)
      setInitialized(true)
    //}
  })

  const onTemplateChange = (newTemplate) => {
    return setTemplate(newTemplate)
  }

  function onContextChange(newIndex) {
    //console.log(props.contexts[newIndex].data.member)
    setContextIndex(newIndex);
    //setContextData(props.contexts[newIndex].data);
  }

  var rhymeCompleter = {
      getCompletions: function(editor, session, pos, prefix, callback) {
        callback(null, [
          {name: "foo", value: "FOO", score: 1, meta: "rhyme"},
          {name: "bar", value: "BAR", score: 2, meta: "rhyme"},
        ]);
      }
  }

  //var langTools = ace.require("ace/ext/language_tools");
  //language_tools.addCompleter(rhymeCompleter);

  return (
    <div>
      <AceEditor
        ref={aceEditorRef}
        mode='liquid'
        theme='solarized_dark'
        value={template}
        height='100px'
        onChange={onTemplateChange}
        editorProps={{$blockScrolling: true}}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2
        }}
      />

      <ReactLiquid
        template={template}
        data={props.contexts[contextIndex].data} />

      <div>
        <List>
          {props.contexts.map((context, index) => (
            <ListItem key={index} display='flex' button onClick={(event) => onContextChange(index)}>
              <ListItemText key={index+'name'} primary={context.name} />

              <ReactLiquid
                template={template}
                data={context.data} />

              <ObjectInspector expandLevel={2} key={index+'insepctor'} data={context.data} />
            </ListItem>
          ))}
        </List>

      </div>
    </div>
  )
}
