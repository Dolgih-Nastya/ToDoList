ToDoList::Application.routes.draw do
  devise_for :users
  root :to =>'main#index'
  get "user_info"  => "main#get_user_info"
  post "new_task" => "main#new_task"
  post "new_project"=>"main#new_project"
  delete "destroy_task/:id"=>"main#destroy_task"
  delete "destroy_project/:id"=>"main#destroy_project"
  put "edit_task/:id" => "main#edit_task"
  put "edit_project/:id" => "main#edit_project"
  put "change_task_status/:id" => "main#change_task_status"
end
