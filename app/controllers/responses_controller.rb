class ResponsesController < ApplicationController
    # before_action :authenticate_user_using_x_auth_token, except: [:new, :edit, :index]
    before_action :load_response, only: %i[show update destroy]
    # def index
    #   responses = Response.all 
    #   render status: :ok, json: {responses: responses}
    # end

        def show
          render status: :ok, json: { response: @response }
        end

      def load_response
            @response = Response.where(poll_id: params[:id]).limit(4)

          rescue ActiveRecord::RecordNotFound => errors
            render json: {errors: errors }
      end 

end