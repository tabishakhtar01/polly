class Response < ApplicationRecord
    belongs_to :poll
    validates :option, presence: true, length: { maximum: 35 }
end
