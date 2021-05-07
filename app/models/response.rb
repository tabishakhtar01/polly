class Response < ApplicationRecord
    belongs_to :poll
    has_many :votes, dependent: :destroy
    validates :option, presence: true, length: { maximum: 35 }
end
