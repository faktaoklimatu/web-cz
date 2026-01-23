require 'ffi-icu'

module Jekyll
  module FormatNumberFilter
    def format_number(input, locale = 'cs')
      return "" if input.nil? || input.to_s.empty?

      num = input.to_f
      formatter = ICU::NumberFormatting.create(locale)
      formatter.format(num)
    end
  end
end

Liquid::Template.register_filter(Jekyll::FormatNumberFilter)
