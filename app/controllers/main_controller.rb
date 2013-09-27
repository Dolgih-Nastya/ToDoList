class MainController < ApplicationController
  def index

  end

  def get_user_info
    @user = current_user
    if user_signed_in?
      render '_projects.html.erb', layout: false
    else
      render '_login.html.erb' , layout: false
    end
  end

  def new_project
    p=Project.create(:name=>"New project to do...", :user_id=>current_user.id)
    p.save
    render 'new_project.html.erb', layout: false
  end



  def new_task
    t = Task.create(:project_id => params[:task][:project],:name => params[:task][:name])
    t.save
    render 'new_task.html.erb'
  end


  def delete_task
    puts params
    @t=Task.find(params[:id])
    @t.destroy
  end

end
