package com.smd.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    @Autowired
    TodoRepository todoRepository;

    @GetMapping("/")
    List<Todo> hello(){
        return todoRepository.findAll();
    }

    @PostMapping("/")
    public Todo create(@RequestBody Todo todo){
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        todoRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo todo = todoRepository.findById(id).orElseThrow();

        todo.setTitle(todoDetails.getTitle());
        todo.setCompleted(todoDetails.getCompleted());

        return todoRepository.save(todo);
    }
}
