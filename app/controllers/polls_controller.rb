class PollsController < ApplicationController
  # before_action :authenticate_user_using_x_auth_token
  before_action :authenticate_user_using_x_auth_token, except: [:index]
  before_action :load_poll, only: %i[show update destroy]
  before_action :load_responses, :load_votes, only: %i[show]

    def index
        polls = Poll.all
        render status: :ok, json: {polls: polls}
    end

    def create
        # @poll = Poll.new(poll_params)
        @poll = Poll.new(poll_params.merge(user_id: @current_user.id))
  
        if @poll.save
          render status: :ok, json: { notice: t('successfully_created', entity: 'Poll') }
          # render status: :ok, json: { notice: 'successfully_created' }

        else
          errors = @poll.errors.full_messages
          render status: :unprocessable_entity, json: { errors: errors  }
        end
      rescue ActiveRecord::RecordNotUnique => e
        render status: :unprocessable_entity, json: { errors: e.message }
    end

    def show
      render status: :ok, json: {  poll: @poll, responses: @responses, votes: @votes }
    end

    def update
      if @poll.update(poll_params)
        render status: :ok, json: {  }
      else
        render status: :unprocessable_entity, json: { errors: @poll.errors.full_messages }
      end
    end

    def destroy
      if @poll.destroy
        render status: :ok, json: { notice: 'Successfully deleted task.' }
      else
        render status: :unprocessable_entity, json: { errors:
        @poll.errors.full_messages }
      end
    end

      private

    def poll_params
      params.require(:poll).permit(:title, responses_attributes: [:option])
    end

      
    def load_poll
      @poll = Poll.find(params[:id])
      rescue ActiveRecord::RecordNotFound => errors
        render json: {errors: errors }
    end 

    def load_responses
      @responses = Response.where(poll_id: params[:id]).limit(4)

    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors }
    end
  
    def load_votes
      @votes = Vote.where(poll_id: params[:id])
      rescue ActiveRecord::RecordNotFound => errors
        render json: {errors: errors}
    end
end