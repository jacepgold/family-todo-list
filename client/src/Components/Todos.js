import React, { Component } from 'react';
import axios from 'axios';
import { Dimmer, Loader, Container, Segment, Header, Form, List } from 'semantic-ui-react';

class Todos extends Component {
  state = { loading: true, todos: [], name: "", }

  componentDidMount() {
    axios.get("/api/todos")
      .then(({ data: todos }) => {
        this.setState({ todos, loading: false })
      }).catch( err => {
        console.log(err)
    });
  }


  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { todos, name } = this.state;
    axios.post("/api/todos", { name })
      .then(({ data }) => {
        console.log('Sent')
        console.log(data)
        this.setState({ todos: [data, ...todos], name: "", });
      })
  }


  updateTodo = (id) => {
    axios.put(`/api/todos/${id}`)
      .then(({ data }) => {
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
    const { loading, todos, name, } = this.state;
    return (
      <div id="app">
        <Dimmer active={ loading }>
          <Loader content='Loading...' />
        </Dimmer>
        <Container>
          <Segment inverted textAlign='center'>
            <Header as='h1'>Gold Family Todo List</Header>
            <Header as='h4'>Click an item to mark it complete</Header>
            <p>
              Todo:
              Get user, each user has a different color for text and line-through.
              Admin user can create items
            </p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                name="name"
                required
                value={name}
                placeholder='Add Todo'
                onChange={this.handleChange}
              />
            </Form>
            <List>
              {
                todos.map(todo =>
                  <List.Item
                    key={todo.id}
                    style={todo.complete ? ( styles.li, styles.complete ) : styles.li }
                    onClick={() => this.updateTodo(todo.id)}
                  >
                    {todo.name}
                  </List.Item>
                )
              }
            </List>
          </Segment>
        </Container>
      </div>
    );
  }
}

const styles = {
  complete: {
    textDecoration: 'line-through',
    color: 'grey',
  },
  li: {
    paddingTop: '15px',
    paddingBottom: '15px',
  }
}

export default Todos;
