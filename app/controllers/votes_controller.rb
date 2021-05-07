class VotesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[create]

  def create
    @vote = Vote.new(vote_params)
    puts @vote
    if @vote.save
      render status: :ok, json: { vote: @vote, notice: 'Voted Successfully!' }
    else
      format.json { render json: @vote.errors, status: :unprocessable_entity }
    end
  end
  
  private 

  def vote_params
    params.require(:vote)
      .permit(:poll_id, :option_id)
      .merge(user_id: @current_user.id)
  end

end