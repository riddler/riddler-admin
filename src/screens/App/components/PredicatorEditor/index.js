import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace'
import Predicator from 'predicator'
import { ObjectInspector } from 'react-inspector'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import 'brace/mode/liquid'
import 'brace/theme/solarized_dark'
import 'brace/ext/language_tools'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }
}))


export default function PredicatorEditor(props) {
  const classes = useStyles();
  const [initialized, setInitialized] = useState(false)
  const [contextIndex, setContextIndex] = useState(0)
  const [template, setTemplate] = useState(props.template)
  const [instructions, setInstructions] = useState([])

  const aceEditorRef = React.createRef()

  useEffect(() => {
    //if (!initialized) {
      //aceEditorRef.acerequire("foo")
      console.log(aceEditorRef.editor)
      setInitialized(true)
    //}
  })

  const onTemplateChange = (newTemplate) => {
    setInstructions(Predicator.toInstructions(newTemplate))
    return setTemplate(newTemplate)
  }

  function onContextChange(newIndex) {
    setContextIndex(newIndex);
  }

  return (
    <div>
      <AceEditor
        ref={aceEditorRef}
        theme='solarized_dark'
        value={template}
        height='100px'
        onChange={onTemplateChange}
        editorProps={{$blockScrolling: true}}
      />

      <div>
        <List>
          {props.contexts.map((context, index) => (
            <ListItem key={index} display='flex' button onClick={(event) => onContextChange(index)}>
              <ListItemText key={index+'name'} primary={context.name} />

              <div>{JSON.stringify(Predicator.evaluateInstructions(instructions, context.data))}</div>

              <ObjectInspector expandLevel={2} key={index+'insepctor'} data={context.data} />
            </ListItem>
          ))}
        </List>

      </div>
    </div>
  )
}
