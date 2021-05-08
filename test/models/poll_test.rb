require "test_helper"

class PollTest < ActiveSupport::TestCase
    def setup
        @user = User.create!(name: 'Sam Smith',
                             email: 'sam@example.com',
                             password: 'welcome',
                             password_confirmation: 'welcome')
        Poll.delete_all
    
        @poll = Poll.new(title: 'This is a test task', user: @user)
    end

    def test_not_instance_of_user
        poll = Poll.new
        assert_not_instance_of User, poll
    end

    def test_value_of_title_assigned
        poll = Poll.new(title: "Title assigned for testing")
    
        assert poll.title == "Title assigned for testing"
    end

    def test_value_created_at
        poll = Poll.new(title: "This is a test poll", user: @user)
        assert_nil poll.created_at
      
        poll.save!
        assert_not_nil poll.created_at
    end

    def test_error_raised
        assert_raises ActiveRecord::RecordNotFound do
          Poll.find(SecureRandom.uuid)
        end
    end

    def test_count_of_number_of_polls
        assert_difference ['Poll.count'], 2 do
            Poll.create!(title: 'Creating a poll through test', user: @user)
            Poll.create!(title: 'Creating another poll through test', user: @user)
    end

    def test_poll_should_not_be_valid_without_title
            @poll.title = ''
            assert @poll.invalid?
          end
    end
end