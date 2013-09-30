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
    @p=Project.create(:name=>"New project to do...", :user_id=>current_user.id)
    @p.save
    render 'new_project.html.erb', layout: false
  end



  def new_task
    @t = Task.create(:project_id => params[:task][:project],:name => params[:task][:name])
    @t.save
    render 'new_task.html.erb'
  end

  def edit_task
    @t=Task.find(params[:id])
    @t.update_attributes(:name=>params[:new_name])
    @t.save
    render  'new_task.html.erb'
  end

  def change_task_status
    @t=Task.find(params[:id])
    @t.update_attributes(:status=>params[:status])
    @t.save
    render :nothing => true
  end

  def edit_project
    puts 'params'
    puts params
    @p=Project.find(params[:id])
    @p.update_attributes(:name=>params[:new_name])
    @p.save
    render  'new_project.html.erb'
  end


  def destroy_task
   @t=Task.find(params[:id])
   @t.destroy
   render :nothing => true
  end

  def destroy_project
    @p=Project.find(params[:id])
    @p.destroy
    render :nothing => true
  end

end
