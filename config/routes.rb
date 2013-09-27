ToDoList::Application.routes.draw do
  devise_for :users
  root :to =>'main#index'
  get "user_info"  => "main#get_user_info"
  post "new_task" => "main#new_task"
  post "new_project"=>"main#new_project"
  post "new_task"=>"main#new_task"
  delete "delete_task"=>"main#delete_task"
end
