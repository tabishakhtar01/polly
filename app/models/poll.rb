class Poll < ApplicationRecord
    belongs_to :user
    has_many :responses, dependent: :destroy
    accepts_nested_attributes_for :responses
    validates :title, presence: true, length: { maximum: 50 }
end