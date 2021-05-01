class PollsController < ApplicationController
    def index
        # render html: "This is index action of Polls controller"
        @polls = Poll.all
    end
end