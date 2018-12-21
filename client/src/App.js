import React, { Component } from 'react';
import axios from 'axios';
import { Container, Segment, Header, Form, List } from 'semantic-ui-react';

class App extends Component {
  state = { todos: [], name: "", }

  componentDidMount() {
    axios.get("/api/todos")
      .then(({ data: todos }) => {
        this.setState({ todos, })
      });
  }


  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, });
  }
  

  handleSubmit = (e) => { // Bad copy
    e.preventDefault();
    const { todos, name } = this.state;
    axios.post("/api/todos", { name })
      .then( ({ data }) => {
        console.log('Sent')
        console.log(data)
        this.setState({ todos: [data, ...todos], name: "", });
      })
  }


  updateTodo = (id) => {
    axios.put(`/api/todos/${id}`)
      .then( ({ data }) => {
        const todos = this.state.todos.map(todo => {
          if (todo.id === id)
            return data
          return todo
        })
        this.setState({ todos: todos })
      }).catch(err => {
        console.log(err)
    });
  }


  render() {
    const { todos, name, } = this.state;
    return (
      <Container>
        <Segment textAlign='center'>
          <Header as='h1'>Todo List</Header>
          <Header as='h4'>Click an item to mark it complete</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              name="name"
              required
              value={name}
              onChange={this.handleChange}
            />
          </Form>
          <List>
            {todos.map(t =>
              <List.Item
                key={t.id}
                style={t.complete ? styles.complete : {}}
                onClick={() => this.updateTodo(t.id)}
              >
                {t.name}
              </List.Item>
            )}
          </List>
        </Segment>
      </Container>
    );
  }
}

const styles = {
  complete: {
    textDecoration: 'line-through',
    color: 'grey',
  },
}

export default App;
