
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import * as ToDoActions from "../../../actions/toDoAction";
import * as DeleteActions from "../../../actions/deleteAction";
import { bindActionCreators } from "redux";


class ToDoList extends Component {
  constructor(){
    super()
    this.state = {
      status: 0,
    }
  }

  changeStatus(todo, changeStatus) {
    console.log("changeSttus", todo);
    const { ToDoActions } = this.props;
    todo.change = changeStatus;
    ToDoActions.changeTodoStatus(todo);
  }

  deleteTodo(todo){
    console.log("changeSttus", todo);
    const { ToDoActions } = this.props;
    ToDoActions.DeleteToDo(todo);
  }

  render() {
    const { todo } = this.props
    console.log(todo, 'todo')
    let swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: "red",
        onPress: ()=>this.deleteTodo(todo)
      }
    ]

    return (
      <View>
        <Swipeout right={swipeoutBtns} style={styles.toDoEntry}>
        <TouchableOpacity onPress={(e)=>this.changeStatus(todo, "not completed")} style={styles.red}>
              <Text>change status</Text>
            </TouchableOpacity>
          <View style={styles.padding, styles.border}>
             <Text style={styles.toDoEntry}>  
            {todo.content} {todo.timeStamp}
            <Text style={styles.status}>
            {todo.status}
            </Text>
          </Text>
          </View>
        </Swipeout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toDoEntry: {
    height: 80,
    backgroundColor: "white"
   }, 
   status: {
    fontSize: 18,
    color: "red",
    alignItems: 'flex-end'
   },
   padding: {
    padding: 4,
   },
   border: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'gray',
   }
})

const mapDispatch = (dispatch) => {
  return {
    dispatch,
    ToDoActions: bindActionCreators(
      ToDoActions,
      dispatch
    ),
    DeleteActions: bindActionCreators(
      DeleteActions,
      dispatch
    )
  }
}


export default connect(null, mapDispatch)(ToDoList)

