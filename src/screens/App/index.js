import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import LiquidEditor from './components/LiquidEditor';
import PredicatorEditor from './components/PredicatorEditor';

import Dashboard from '../../dashboard/Dashboard';


const contexts = [
  {name: 'Member Bob', data: {member:{name: 'Bob'}, age: 13}},
  {name: 'Member Alice', data: {member:{name: 'Alice'}, age: 20}}
]

export default function App() {
  return (
    <div>
      <LiquidEditor
        template="Hello {{ member.name }}"
        contexts={contexts} />

      <PredicatorEditor
        template="true or true"
        contexts={contexts} />
    </div>
  );
}
