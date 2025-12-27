module Jekyll
  module RoundSignificantFilter
    def round_signif(input, digits = 1)
      return "" if input.nil? || input.to_s.empty?
      
      num = input.to_f
      return 0 if num.zero?

      digits = digits.to_i
      digits = 1 if digits < 1

      magnitude = Math.log10(num.abs).floor
      scale = 10.0 ** (digits - magnitude - 1)
      
      (num * scale).round / scale
    end
  end
end

Liquid::Template.register_filter(Jekyll::RoundSignificantFilter)
