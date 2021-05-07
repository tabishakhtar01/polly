class User < ApplicationRecord
    VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

    has_many :polls, dependent: :destroy
    has_many :responses, dependent: :destroy
    has_many :votes, dependent: :destroy
    has_secure_password
    has_secure_token :authentication_token
    
    
    validates :name, presence: true, length: { maximum: 35 }
    validates :email, presence: true,
                    uniqueness: true,
                    length: { maximum: 50 },
                    format: { with: VALID_EMAIL_REGEX }

    validates :password, presence: true, confirmation: true, length: { minimum: 6 }
    validates :password_confirmation, presence: true, on: :create

    private

    def to_lowercase
      email.downcase!
    end

end