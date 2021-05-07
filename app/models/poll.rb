class Poll < ApplicationRecord
    has_many :responses, dependent: :destroy
    has_many :votes, dependent: :destroy
    belongs_to :user
    validates :title, presence: true, length: { maximum: 50 }
    accepts_nested_attributes_for :responses
end